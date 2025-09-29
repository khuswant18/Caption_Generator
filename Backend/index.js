import express from "express";
import multer from "multer";
import path from "path";
import { exec } from "child_process";
import { parseSRT } from "./srtParser.js";
import Ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


Ffmpeg.setFfmpegPath(ffmpegInstaller.path);

function extractAudio(videoFilePath, wavPath) {
  return new Promise((resolve, reject) => {
    Ffmpeg(videoFilePath)
      .output(wavPath)
      .audioCodec("pcm_s16le")
      .format("wav")
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .run();
  });
}


const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (["video/mp4"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only mp4, mov, mkv allowed."), false);
    }
  },
});

app.post("/uploads", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No video uploaded" });

    const videoFilePath = req.file.path;
    const videoFileName = req.file.originalname;
    const wavPath = `${videoFilePath}.wav`;
    const srtPath = wavPath.replace(/\.wav$/, ".wav.srt");


    await extractAudio(videoFilePath, wavPath);


    const whisperPath =
      process.env.WHISPER_PATH ||
      path.join(process.cwd(), "whisper.cpp/build/bin/whisper-cli");
    const modelPath =
      process.env.WHISPER_MODEL_PATH ||
      path.join(process.cwd(), "whisper.cpp/models/ggml-small.bin");


    await new Promise((resolve, reject) => {
      exec(
        `"${whisperPath}" -m "${modelPath}" -f "${wavPath}" -l hi -osrt`,
        (err, stdout, stderr) => {
          if (err) {
            console.error("Whisper error:", stderr || err);
            return reject(err);
          }
          resolve();
        }
      );
    });

    if (!fs.existsSync(srtPath)) {
      console.error("SRT file not found at:", srtPath);
      return res.status(500).json({ error: "SRT file not generated" });
    }

    const captions = parseSRT(srtPath);


    res.json({
      videoFilePath,
      captions,
      originalName: videoFileName,
    });

    fs.unlink(videoFilePath, () => {});
    fs.unlink(wavPath, () => {});
    fs.unlink(srtPath, () => {});
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/", (req, res) => res.send("Hello World"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

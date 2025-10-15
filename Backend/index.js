import express from "express";
import multer from "multer";
import path from "path";
import { exec } from "child_process";
import { parseWhisperJSON } from "./whisperJsonParser.js";
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
    const jsonPath = `${videoFilePath}.json`;

    await extractAudio(videoFilePath, wavPath);

    // Use whisper.py for Hindi/Hinglish transcription
    const whisperPyPath =
      process.env.WHISPER_PY_PATH ||
      path.join(process.cwd(), "whisper.py");
    
    const pythonCommand = process.env.PYTHON_PATH || "python3";

    console.log("Starting Whisper.py transcription...");
    console.log("Command:", `${pythonCommand} "${whisperPyPath}" "${wavPath}" --output "${jsonPath}"`);

    await new Promise((resolve, reject) => {
      exec( 
        `${pythonCommand} "${whisperPyPath}" "${wavPath}" --output "${jsonPath}"`,
        {
          maxBuffer: 10 * 1024 * 1024, // 10MB buffer
          timeout: 300000 // 5 minutes timeout (for model download on first run)
        },
        (err, stdout, stderr) => {
          if (err) {
            console.error("Whisper.py error:", err.message);
            console.error("stderr:", stderr);
            console.error("stdout:", stdout);
            return reject(new Error(`Transcription failed: ${err.message}`));
          }
          if (stderr) {
            console.log("Whisper.py stderr:", stderr);
          }
          if (stdout) {
            console.log("Whisper.py stdout:", stdout);
          }
          resolve();
        }
      );
    });

    if (!fs.existsSync(jsonPath)) {
      console.error("JSON file not found at:", jsonPath);
      return res.status(500).json({ 
        error: "Transcription file not generated",
        details: "Whisper.py did not create the output file" 
      });
    } 

    const captions = parseWhisperJSON(jsonPath, 30);

    res.json({
      videoFilePath,
      captions,
      originalName: videoFileName,
    });

    // Cleanup temporary files
    fs.unlink(videoFilePath, () => {});
    fs.unlink(wavPath, () => {});
    fs.unlink(jsonPath, () => {});
  } catch (error) {
    console.error("Upload error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ 
      error: "Something went wrong",
      message: error.message,
      details: error.toString()
    });
  }
});

app.get("/", (req, res) => res.send("Hello World"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

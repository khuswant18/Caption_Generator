const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const transcribeRoute = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } 
});

transcribeRoute.post('/', upload.single('video'), async (req, res) => {
  const timestamp = Date.now();
  const videoPath = path.join('uploads', `video_${timestamp}.mp4`);
  const audioPath = path.join('uploads', `audio_${timestamp}.wav`);
  const outputFile = path.join('uploads', `output_${timestamp}.json`);
 
  try { 
    

    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }

    fs.writeFileSync(videoPath, req.file.buffer);

    await new Promise((resolve, reject) => {
      exec(
        `ffmpeg -i ${videoPath} -vn -acodec pcm_s16le -ar 16000 -ac 1 ${audioPath}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error('FFmpeg error:', stderr);
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });

    console.log('Starting transcription...');


    await new Promise((resolve, reject) => {
      exec(
        `python3 whisper.py ${audioPath} --output ${outputFile}`,
        {
          maxBuffer: 10 * 1024 * 1024, 
          timeout: 300000 
        },
        (error, stdout, stderr) => {
          if (error) {
            console.error('Whisper error:', stderr);
            reject(error);
          } else {
            if (stderr) console.log('Whisper stderr:', stderr);
            if (stdout) console.log('Whisper stdout:', stdout);
            resolve();
          }
        }
      );
    }); 

    const result = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    
    let vtt = 'WEBVTT\n\n';
    result.segments.forEach((segment, i) => {
      const start = new Date(segment.start * 1000).toISOString().substr(11, 12);
      const end = new Date(segment.end * 1000).toISOString().substr(11, 12);
      vtt += `${i + 1}\n${start} --> ${end}\n${segment.text}\n\n`;
    });

    fs.unlinkSync(videoPath);
    fs.unlinkSync(audioPath); 
    fs.unlinkSync(outputFile);

    res.json({ 
      success: true, 
      webvtt: vtt,
      captions: result.segments,
      fullText: result.text
    });

  } catch (error) {
    console.error('Transcription error:', error);
    
    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    
    res.status(500).json({ 
      success: false,
      error: 'Transcription failed',
      details: error.message,
      help: 'Make sure Python3 and FFmpeg are installed with required packages'
    });
  }
});

module.exports = transcribeRoute;


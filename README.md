# Caption Generator 🎬

An AI-powered video caption generator that automatically creates subtitles for uploaded videos using OpenAI's Whisper model. Built with React (Remotion) frontend and Node.js backend.

## ✨ Features

- **Automatic Speech Recognition**: Uses Whisper.cpp for accurate speech-to-text conversion
- **Multi-language Support**: Supports English and Hindi caption generation
- **Video Processing**: Extracts audio from video files for transcription
- **Real-time Preview**: Live preview of videos with generated captions using Remotion
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Format Support**: Handles MP4 video files
- **Caption Export**: Generates SRT subtitle files

## 🏗️ Architecture

### Frontend (Remotion + React)
- **React 19** with modern hooks
- **Remotion** for video composition and preview
- **Tailwind CSS** for styling
- **Video uploading and processing UI**
- **Real-time caption preview**

### Backend (Node.js + Express)
- **Express.js** server with CORS support
- **Multer** for file upload handling
- **FFmpeg** for audio extraction
- **Whisper.cpp** integration for speech recognition
- **SRT file parsing and processing**

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- FFmpeg installed on your system
- Whisper.cpp compiled with models

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khuswant18/Caption_Generator.git
   cd Caption_Generator
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   ```

3. **Setup Whisper.cpp**
   ```bash
   # The whisper.cpp directory should already be included
   cd whisper.cpp
   make
   
   # Download a Whisper model (e.g., small model)
   bash ./models/download-ggml-model.sh small
   ```

4. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

### Environment Configuration

Create a `.env` file in the Backend directory:

```env
PORT=4000
WHISPER_PATH=./whisper.cpp/build/bin/whisper-cli
WHISPER_MODEL_PATH=./whisper.cpp/models/ggml-small.bin
```

## 🎯 Usage

### Starting the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server will run on `http://localhost:4000`

2. **Start the Frontend (Remotion Studio)**
   ```bash
   cd Frontend
   npm run dev
   ```
   Remotion Studio will open in your browser

### Using the Caption Generator

1. **Upload Video**: Select an MP4 file using the upload interface
2. **Choose Language**: Select between English and Hindi
3. **Generate Captions**: The system will automatically:
   - Extract audio from your video
   - Process it through Whisper for speech recognition
   - Generate SRT captions
   - Display video preview with captions
4. **Preview & Export**: Use Remotion's interface to preview and render your captioned video


## 🛠️ API Endpoints

### POST `/uploads`
Upload a video file and generate captions

**Request:**
- `Content-Type: multipart/form-data`
- `video`: MP4 file (max 100MB)

**Response:**
```json
{
  "videoFilePath": "uploads/abc123.mp4",
  "captions": [
    {
      "id": 1,
      "start": 0.5,
      "end": 3.2,
      "text": "Hello, welcome to our video"
    }
  ],
  "originalName": "my-video.mp4"
}
```

### GET `/`
Health check endpoint

## 🧪 Development

### Backend Development
```bash
cd Backend
npm run start  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd Frontend
npm run dev    # Starts Remotion Studio
npm run build  # Builds the video composition
npm run lint   # Runs ESLint
```

## 📋 Dependencies

### Backend
- **express**: Web server framework
- **multer**: File upload middleware
- **fluent-ffmpeg**: FFmpeg wrapper for audio extraction
- **cors**: Cross-origin resource sharing
- **@ffmpeg-installer/ffmpeg**: FFmpeg installation

### Frontend
- **remotion**: Video creation framework
- **react**: UI library
- **tailwindcss**: CSS framework
- **subtitles-parser**: SRT file parsing
- **@remotion/media-utils**: Media utilities for Remotion



### Supported Languages
Currently configured for:
- English (`en`)
- Hindi (`hi`)  

Additional languages can be added by modifying the language selection in the frontend and backend processing.

## 🙏 Acknowledgments

- [OpenAI Whisper](https://github.com/openai/whisper) for the speech recognition model
- [Whisper.cpp](https://github.com/ggerganov/whisper.cpp) for the C++ implementation
- [Remotion](https://remotion.dev/) for the video composition framework
- [FFmpeg](https://ffmpeg.org/) for video/audio processing



**Made with ❤️ by [khuswant18](https://github.com/khuswant18)**
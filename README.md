# Caption Generator 🎬

An AI-powered video caption generator that automatically creates subtitles for uploaded videos using Whisper AI with specialized Hindi-to-Hinglish support. Built with React (Remotion) frontend and Node.js backend.

## ✨ Features

- **Automatic Speech Recognition**: Uses Whisper AI with specialized Hindi2Hinglish model
- **Hinglish Support**: Native support for Hindi and Hinglish (Hindi written in Roman script) captions
- **Multi-language Support**: Supports English and Hindi/Hinglish caption generation
- **Video Processing**: Extracts audio from video files for transcription
- **Real-time Preview**: Live preview of videos with generated captions using Remotion
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Caption Positioning**: Choose between top, bottom, or center caption placement
- **Smart Segmentation**: Automatically breaks long sentences into readable caption segments
- **Format Support**: Handles MP4 video files

## 🏗️ Architecture

### Frontend (Remotion + React)
- **React 19** with modern hooks
- **Remotion** for video composition and preview
- **Tailwind CSS v4** for styling
- **Video uploading and processing UI**
- **Real-time caption preview with positioning controls**

### Backend (Node.js + Express + Python)
- **Express.js** server with CORS support
- **Multer** for file upload handling
- **FFmpeg** for audio extraction
- **Python Whisper** with transformers for speech recognition
- **Specialized Hindi2Hinglish model** for accurate transcription
- **JSON-based caption processing**

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- npm or yarn
- FFmpeg installed on your system

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

3. **Setup Python Environment**
   ```bash
   # Run the setup script (recommended)
   ./setup.sh
   
   # OR manually install Python dependencies
   pip install -r requirements.txt
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
PYTHON_PATH=python3
WHISPER_PY_PATH=./whisper.py

# If using virtual environment
# PYTHON_PATH=./venv/bin/python
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
   Remotion Studio will run on `http://localhost:3001`
   
   > **Note:** The frontend is configured to use port 3001 by default to avoid conflicts with other applications commonly running on port 3000.

### Using the Caption Generator

1. **Upload Video**: Select an MP4 file using the upload interface
2. **Automatic Processing**: The system will automatically:
   - Extract audio from your video using FFmpeg
   - Process it through specialized Hindi2Hinglish Whisper model
   - Generate smart caption segments with proper timing
   - Display video preview with captions
3. **Customize Caption Position**: Use the dropdown to position captions at top or bottom
4. **Preview & Export**: Use Remotion's interface to preview and render your captioned video
5. **Upload New Video**: Click "Upload New Video" button to process another file


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

### Backend (Node.js)
- **express**: Web server framework
- **multer**: File upload middleware
- **fluent-ffmpeg**: FFmpeg wrapper for audio extraction
- **cors**: Cross-origin resource sharing
- **@ffmpeg-installer/ffmpeg**: FFmpeg installation

### Backend (Python)
- **torch**: PyTorch for deep learning
- **transformers**: Hugging Face transformers library for Whisper
- **librosa**: Audio processing and loading
- **soundfile**: Audio file I/O
- **numpy**: Numerical computations

### Frontend
- **remotion**: Video creation framework
- **react**: UI library
- **tailwindcss**: CSS framework
- **@remotion/media-utils**: Media utilities for Remotion



## 🔧 Configuration

### Whisper Model
The application uses the **Oriserve/Whisper-Hindi2Hinglish-Swift** model from Hugging Face, which is specifically optimized for:
- **Hindi speech recognition**
- **Automatic Hindi-to-Hinglish conversion** (Roman script)
- **Natural language flow** with proper word segmentation
- **Fast processing** with optimized inference

### Caption Segmentation
- **Chunk Duration**: 8 seconds per audio segment
- **Words Per Caption**: 6 words maximum for readability
- **Frame Rate**: 30 FPS for smooth synchronization
- **Auto-splitting**: Long sentences automatically broken into shorter segments

### Supported Languages
Currently configured for:
- **Hindi/Hinglish**: Native support with specialized model
- **English**: Can be added by modifying the model parameter

The Hinglish model is particularly effective for Indian content where speakers mix Hindi and English, providing natural Roman script output.

## 🙏 Acknowledgments

- [OpenAI Whisper](https://github.com/openai/whisper) for the speech recognition model
- [Oriserve/Whisper-Hindi2Hinglish-Swift](https://huggingface.co/Oriserve/Whisper-Hindi2Hinglish-Swift) for the specialized Hinglish model
- [Hugging Face Transformers](https://huggingface.co/transformers) for the model implementation
- [Whisper.cpp](https://github.com/ggerganov/whisper.cpp) for the C++ implementation
- [Remotion](https://remotion.dev/) for the video composition framework
- [FFmpeg](https://ffmpeg.org/) for video/audio processing



**Made with ❤️ by [khuswant18](https://github.com/khuswant18)**
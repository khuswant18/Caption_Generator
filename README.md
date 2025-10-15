# Caption Generator 🎬

AI-powered video caption generator with automatic Hindi/Hinglish support. Upload a video, get auto-generated captions with live preview using Remotion.

## ✨ Features

- 🎙️ **AI Speech Recognition** - Whisper AI with specialized Hindi2Hinglish model
- 🇮🇳 **Hinglish Support** - Converts Hindi audio to Roman script (Hinglish)
- 🎥 **Live Preview** - Real-time video preview with captions using Remotion
- 🎨 **Customizable** - Adjust caption position (top/bottom) and styling
- ⚡ **Smart Segmentation** - Auto-breaks long sentences into readable chunks
- 📹 **MP4 Support** - Works with standard MP4 video files

## 🚀 Quick Start

### Prerequisites
                                                                         
```bash
- Node.js (v16+)
- Python 3.8+
- FFmpeg
```

### Installation

**1. Clone & Install**
```bash
git clone https://github.com/khuswant18/Caption_Generator.git
cd Caption_Generator
```

**2. Setup Backend**
```bash
cd Backend
npm install
pip install -r requirements.txt
```

**3. Setup Frontend**
```bash
cd ../Frontend
npm install
```

### Run the App

**Start Backend** (Terminal 1)
```bash
cd Backend
npm start
```
→ Runs on `http://localhost:4000`

**Start Frontend** (Terminal 2)
```bash
cd Frontend
npm run dev
```
→ Opens on `http://localhost:3001`

## 📖 How to Use

1. **Upload Video** - Click upload button and select an MP4 file
2. **Auto Processing** - AI extracts audio → transcribes → generates captions
3. **Preview** - See your video with captions in real-time
4. **Customize** - Change caption position (top/bottom)
5. **Render** - Export your captioned video

## 🛠️ Tech Stack

**Frontend**
- React 19 + Remotion 4.0
- Tailwind CSS v4

**Backend**
- Node.js + Express
- Python Whisper AI
- FFmpeg (audio extraction)

**AI Model**
- [Oriserve/Whisper-Hindi2Hinglish-Swift](https://huggingface.co/Oriserve/Whisper-Hindi2Hinglish-Swift)

## 📁 Project Structure

```
Caption_Generator/
├── Backend/
│   ├── server.js              # Express server
│   ├── whisper.py             # AI transcription script
│   ├── routes/
│   │   ├── transcriptions.routes.js
│   │   └── render.routes.js
│   ├── package.json
│   └── requirements.txt       # Python dependencies
│
└── Frontend/
    ├── src/
    │   ├── Root.jsx           # Main app component
    │   ├── VideoUploader.jsx  # Upload interface
    │   ├── VideoComposition.jsx
    │   └── UserVideoComposition.jsx  # Caption rendering
    ├── package.json
    └── remotion.config.js
```

## � API Endpoints

### `POST /api/v1/transcribe`
Upload video and get captions

**Request:**
```bash
Content-Type: multipart/form-data
video: <MP4 file>
```

**Response:**
```json
{
  "success": true,
  "captions": [
    {
      "id": 0,
      "start": 0.5,
      "end": 3.2,
      "text": "Hello dosto welcome"
    }
  ],
  "webvtt": "WEBVTT\n\n...",
  "fullText": "Complete transcription..."
}
```

## ⚙️ Configuration

**Backend Port** (`.env` in Backend/)
```env
PORT=4000
```

**Frontend Port** (`remotion.config.js`)
```javascript
Config.setPort(3001);
```

## 🎨 Caption Customization

Edit `Frontend/src/UserVideoComposition.jsx`:

```javascript
fontSize: "clamp(16px, 2.5vw, 28px)",  // Change caption size
width: "80%",                          // Caption width
backgroundColor: "rgba(0, 0, 0, 0.75)", // Background opacity
```

## 🐛 Troubleshooting

**Port 3000/3001 in use?**
```bash
lsof -i :3001
kill -9 <PID>
```

**FFmpeg not found?**
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg
```

**Python packages missing?**
```bash
cd Backend
pip install -r requirements.txt
```

## � License

MIT License - feel free to use for your projects!

## 🙏 Credits

- [Whisper AI](https://github.com/openai/whisper) by OpenAI
- [Remotion](https://remotion.dev/) for video framework
- [Hugging Face](https://huggingface.co/) for model hosting

---

**Made with ❤️ by [Khuswant Raj Purohit](https://github.com/khuswant18)**

⭐ Star this repo if you found it helpful!
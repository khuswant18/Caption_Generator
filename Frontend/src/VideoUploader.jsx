import { useState, useRef } from "react";

export const VideoUploader = ({ onupload }) => {
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [autoGenerateCaptions, setAutoGenerateCaptions] = useState(true);
  const fileInputRef = useRef(null);

  const getVideoMetadata = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        const metadata = {
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration, 
          fps: 30, 
        };
        URL.revokeObjectURL(video.src);
        resolve(metadata);
      };

      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error("Failed to load video metadata"));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const processFile = async (file) => {
    if (!file || !file.type.startsWith("video/")) {
      alert("Please select a valid video file");
      return;
    }

    setLoading(true);

    try {

      const metadata = await getVideoMetadata(file);

      let captions = null;

      if (autoGenerateCaptions) {
        const formData = new FormData();
        formData.append("video", file);

        const res = await fetch("http://localhost:4000/api/v1/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
     
      if (data.captions && Array.isArray(data.captions)) {
        captions = data.captions.map(caption => ({
          ...caption,
          startFrame: Math.floor(caption.start * metadata.fps),
          endFrame: Math.floor(caption.end * metadata.fps)
        }));
      }
      }

      setTimeout(() => {
        setLoading(false);
        onupload(
          file,
          captions,
          metadata,
          selectedLanguage,
          autoGenerateCaptions,
        );
      }, 500);
    } catch (error) {
      setLoading(false);
      alert("Error uploading video. Please try again.");
    }
  };

  const handleChange = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    await processFile(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Caption Language:
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900"
            disabled={!autoGenerateCaptions}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setAutoGenerateCaptions(!autoGenerateCaptions)}
            className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${autoGenerateCaptions ? "bg-blue-600" : "bg-gray-200"}
            `}
          > 
            <span
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                ${autoGenerateCaptions ? "translate-x-5" : "translate-x-0"}
              `}
            />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Auto-Generate Captions
          </span>
        </div>
      </div>

      <div
        className={`
          relative border-2 border-gray-300 hover:border-blue-400 rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${loading ? "pointer-events-none opacity-75" : ""}
        `}
        onClick={openFileDialog}
      >
        {!loading ? (
          <>
            <div className="mx-auto w-16 h-16 mb-4">
              <svg
                className="w-full h-full text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              Upload Your Video
            </h3>

            <p className="text-gray-500 mb-4">
              Click to <span className="text-blue-600 font-medium">browse</span>{" "}
              and select your video file
            </p>

            <div className="text-sm text-gray-400 space-y-1">
              <p>Supported formats: MP4</p>
              <p>Maximum file size: 100MB</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              name="video"
              accept=".mp4,.mov,.avi,video/*"
              onChange={handleChange}
              className="hidden"
            />
          </>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16">
              <svg
                className="animate-spin w-full h-full text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-700">
                Processing Your Video
              </h3>

              <p className="text-gray-500">
                {autoGenerateCaptions
                  ? "We're analyzing your video and generating captions..."
                  : "We're processing your video..."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

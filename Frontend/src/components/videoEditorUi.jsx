import { useState } from "react";
import { VideoUploader } from "../VideoUploader"; 
import { VideoComposition } from "../VideoComposition";

export const VideoEditorUi = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [captionPosition, setCaptionPosition] = useState('bottom');
  
  return ( 
    <>
      {!videoFile ? ( 
        <VideoUploader  
          onupload={(file, captions, metadata, language, autoGenerate) => {
            setVideoFile(file);
            setCaption(captions); 
            setVideoMetadata(metadata);
            setSelectedLanguage(language);
            setCaptionsEnabled(autoGenerate);
          }}
        />  
      ) : (
        <>
          <VideoComposition 
            videoFile={videoFile}  
            captions={caption}  
            metadata={videoMetadata}
            language={selectedLanguage}
            captionsEnabled={captionsEnabled}
            captionPosition={captionPosition}
          />
          <div className="mt-4 text-center text-sm text-gray-600 space-y-3">
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <p>Language: <span className="font-semibold">{selectedLanguage === 'english' ? 'English' : 'Hindi'}</span></p>
              <p>Captions: <span className={`font-semibold ${captionsEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                {captionsEnabled ? 'Generated' : 'Disabled'}
              </span></p>
            </div>
            
            {captionsEnabled && (
              <div className="flex justify-center items-center gap-6 flex-wrap">
                <div className="flex items-center gap-3">
                  <label htmlFor="caption-position" className="font-medium text-gray-700">
                    Caption Position:
                  </label>
                  <select
                    id="caption-position"
                    value={captionPosition}
                    onChange={(e) => setCaptionPosition(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                  >
                    <option value="bottom">Bottom</option>
                    <option value="top">Top</option>
                  </select>
                </div>
                
                <button
                  onClick={() => {
                    setVideoFile(null);
                    setCaption("");
                    setVideoMetadata(null);
                    setCaptionPosition('bottom');
                  }}
                  className="px-4 py-1.5 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors shadow-sm"
                >
                  Upload New Video
                </button>
              </div>
            )}
          </div> 
        </> 
      )}
    </>
  );
};

import { useState } from "react";
import { VideoUploader } from "../VideoUploader"; 
import { VideoComposition } from "../VideoComposition";

export const VideoEditorUi = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  
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
          />
          <div className="mt-4 text-center text-sm text-gray-600 space-y-1">
            <p>Selected Language: <span className="font-semibold">{selectedLanguage === 'english' ? 'English' : 'Hindi'}</span></p>
            <p>Captions: <span className={`font-semibold ${captionsEnabled ? 'text-green-600' : 'text-gray-500'}`}>
              {captionsEnabled ? 'Generated' : 'Disabled'}
            </span></p>
          </div> 
        </> 
      )}
    </>
  );
};

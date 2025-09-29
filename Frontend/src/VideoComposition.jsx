import { UserVideoComposition } from "./UserVideoComposition";
import { Composition } from "remotion";
import {useState , useEffect} from 'react'

export const VideoComposition = ({ videoFile, captions, metadata }) => {
  const [videoURL, setVideoURL] = useState(null);
  
  
  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoURL(url);
      return () => URL.revokeObjectURL(url);
    } 
  }, [videoFile]);

  if (!videoURL || !metadata) return null;

  const durationInFrames = Math.ceil(metadata.duration * metadata.fps);

  return (
    <Composition
      id="UserVideo"
      component={UserVideoComposition}
      durationInFrames={durationInFrames}
      fps={metadata.fps}
      width={metadata.width}
      height={metadata.height}
      defaultProps={{ videoURL, captions }} 
    />
  ); 
};

 
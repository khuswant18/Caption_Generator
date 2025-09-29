import { Video, useCurrentFrame } from "remotion";

export const UserVideoComposition = ({ videoURL , captions }) => {
  const frame = useCurrentFrame();
  
  
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}> 
      <Video src={videoURL}/>
      {captions && Array.isArray(captions) && captions.length > 0 && (
        captions.map((cap, i) => {
          if (frame >= cap.startFrame && frame <= cap.endFrame) {
            console.log('Displaying caption:', cap.text, 'at frame:', frame);
            return (
              <div
                key={i}
                style={{ 
                  position: "absolute",
                  bottom: 50,
                  width: "100%",
                  textAlign: "center",
                  color: "white",
                  fontSize: 40,
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px black",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  padding: "10px",
                  borderRadius: "5px"
                }}
              >
                {cap.text}
              </div>
            );
          }
          return null;
        })
      )}
    </div>
  );
};

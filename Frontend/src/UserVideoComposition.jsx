import { Video, useCurrentFrame } from "remotion";

export const UserVideoComposition = ({ videoURL, captions, captionPosition = 'bottom' }) => {
  const frame = useCurrentFrame();
  
  const getPositionStyles = () => {
    const baseStyles = {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
    };
    
    switch (captionPosition) {
      case 'top':
        return { ...baseStyles, top: 40 };
      case 'bottom':
      default:
        return { ...baseStyles, bottom: 60 };
    }
  };


  const getCaptionStyle = () => ({
    ...getPositionStyles(),
    width: "80%",
    textAlign: "center",
    color: "#ffffff",
    fontSize: "clamp(16px, 2.5vw, 28px)", 
    fontFamily: "'Roboto', 'Arial', sans-serif",
    fontWeight: "500",
    lineHeight: 1.3,
    letterSpacing: "0.3px",
    
    textShadow: `
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000,
      0 0 4px rgba(0,0,0,0.8)
    `,
    
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    padding: "8px 16px",
    borderRadius: "4px",
    
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    

    opacity: 1,
    transition: "all 0.2s ease-in-out",
  });


  const getCurrentCaption = () => {
    if (!captions || !Array.isArray(captions) || captions.length === 0) {
      return null;
    }
    
    const activeCaption = captions.find(cap => 
      frame >= cap.startFrame && frame <= cap.endFrame
    );
    
    return activeCaption || null;
  };


  const formatCaptionText = (text) => {
    if (text.length > 50) {
      const words = text.split(' ');
      const midPoint = Math.ceil(words.length / 2);
      const firstLine = words.slice(0, midPoint).join(' ');
      const secondLine = words.slice(midPoint).join(' ');
      return (
        <>
          {firstLine}
          <br />
          {secondLine}
        </>
      );
    }
    return text;
  };

  const currentCaption = getCurrentCaption();

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}> 
      <Video src={videoURL} style={{ width: "100%", height: "100%" }} />
      
      {currentCaption && (
        <div style={getCaptionStyle()}>
          {formatCaptionText(currentCaption.text)}
        </div>
      )}
    </div>
  );
};

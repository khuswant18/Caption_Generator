import fs from "fs";


function parseTime(srtTime) {

  const [hms, ms] = srtTime.split(","); 
  const [h, m, s] = hms.split(":").map(Number);

  return h * 3600 + m * 60 + s + Number(ms) / 1000;  

}
 
export function parseSRT(srtFilePath, fps = 30){ 
  const srtContent = fs.readFileSync(srtFilePath, "utf-8");
  const captions = []; 

  const blocks = srtContent.split("\n\n");

  for (let block of blocks) { 

    const lines = block.split("\n").filter(Boolean); 

    if (lines.length >= 3) { 

      const timeLine = lines[1]; 

      const textLines = lines.slice(2).join(" ").trim();

      const [start, end] = timeLine.split(" --> ");

      const words = textLines.split(' ');
      if (words.length > 8) {
        const duration = parseTime(end) - parseTime(start);
        const segmentDuration = duration / Math.ceil(words.length / 6);
        
        for (let i = 0; i < words.length; i += 6) {
          const segmentWords = words.slice(i, i + 6);
          const segmentStart = parseTime(start) + (i / 6) * segmentDuration;
          const segmentEnd = segmentStart + segmentDuration;
          
          captions.push({
            text: segmentWords.join(' '),
            start: segmentStart,
            end: segmentEnd,
            startFrame: Math.floor(segmentStart * fps),
            endFrame: Math.floor(segmentEnd * fps),
          });
        }
      } else {
        captions.push({
          text: textLines,
          start: parseTime(start),
          end: parseTime(end),
          startFrame: Math.floor(parseTime(start) * fps),
          endFrame: Math.floor(parseTime(end) * fps),
        });
      }
    }
  }
 
  return captions;
} 

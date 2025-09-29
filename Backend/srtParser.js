import fs from "fs";


function parseTime(srtTime) {

  const [hms, ms] = srtTime.split(","); 
  const [h, m, s] = hms.split(":").map(Number);

  return h * 3600 + m * 60 + s + Number(ms) / 1000;  

}

export function parseSRT(srtFilePath,fps = 30){ 
  const srtContent = fs.readFileSync(srtFilePath, "utf-8");
  const captions = []; 

  const blocks = srtContent.split("\n\n");

  for (let block of blocks) {

    const lines = block.split("\n").filter(Boolean); //Boolean("") → false → removes the empty last element.

    if (lines.length >= 3) { 

      const timeLine = lines[1]; 

      const textLines = lines.slice(2).join(" ");

      const [start, end] = timeLine.split(" --> ");

      captions.push({

        text: textLines,

        startFrame: Math.floor(parseTime(start) * fps),

        endFrame: Math.floor(parseTime(end) * fps),

      });
    }
  }
 
  return captions;
} 

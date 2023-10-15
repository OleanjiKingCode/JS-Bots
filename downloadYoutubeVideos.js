const ytdl = require("ytdl-core");
const fs = require("fs");
const progress = require("progress");

const downloadVideo = async (url, outputPath) => {
    try {
      const info = await ytdl.getInfo(url);
  
      if (!info.videoDetails || !info.videoDetails.title) {
        console.error('Video details not available. Skipping download.');
        return;
      }
  
      const videoTitle = info.videoDetails.title;
  
      const videoStream = ytdl(url, {
        filter: "audioandvideo",
        quality: "highestvideo",
      });
  
      // Check if headers are present before accessing 'content-length'
      const fileSize = videoStream.headers ? parseInt(videoStream.headers["content-length"], 10) : 0;
  
      const progressBar = new progress(
        `-> downloading ${videoTitle} [:bar] :percent :etas`,
        {
          complete: "=",
          incomplete: " ",
          width: 40,
          total: fileSize,
        }
      );
  
      const output = fs.createWriteStream(outputPath);
  
      videoStream
        .on("data", (chunk) => {
          progressBar.tick(chunk.length);
        })
        .pipe(output);
  
      output.on("finish", () => {
        console.log(`Download finished. Video saved at: ${outputPath}`);
      });
  
      output.on("error", (err) => {
        console.error("Error writing video file:", err.message);
      });
    } catch (error) {
      console.error("Error fetching video information:", error.message);
    }
  };

  

// Example array of YouTube embed URLs )fire pips forex)
const VideoUrls = [
  "https://www.youtube.com/watch?v=link-of-youtube-video-to-download",
];


// Download videos
VideoUrls.forEach(async (url, index) => {
  await downloadVideo(url, `nameOfVideo/${index + 1}.mp4`);
});

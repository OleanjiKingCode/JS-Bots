const ytdl = require("ytdl-core");
const fs = require("fs");
const progress = require("progress");

const transformToWatchFormat = (embedUrl) => {
  // Extract the video ID from the embed URL
  const videoId = embedUrl.match(/\/embed\/([a-zA-Z0-9_-]{11})/)[1];

  // Construct the watch URL
  return `https://www.youtube.com/watch?v=${videoId}`;
};

// const downloadVideo = async (url, outputPath) => {
//   try {
//     const info = await ytdl.getInfo(url);
//     const videoTitle = info.videoDetails.title;

//     const videoStream = ytdl(url, {
//       filter: "audioandvideo",
//       quality: "highestvideo",
//     });
//     const fileSize = parseInt(videoStream.headers["content-length"], 10);
//     const progressBar = new progress(
//       `-> downloading ${videoTitle} [:bar] :percent :etas`,
//       {
//         complete: "=",
//         incomplete: " ",
//         width: 40,
//         total: fileSize,
//       }
//     );

//     const output = fs.createWriteStream(outputPath);

//     videoStream
//       .on("data", (chunk) => {
//         progressBar.tick(chunk.length);
//       })
//       .pipe(output);

//     output.on("finish", () => {
//       console.log(`Download finished. Video saved at: ${outputPath}`);
//     });

//     output.on("error", (err) => {
//       console.error("Error writing video file:", err.message);
//     });
//   } catch (error) {
//     console.error("Error fetching video information:", error.message);
//   }
// };




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
const embedUrls = [
  "https://www.youtube.com/embed/h9NIW-_4JyM",
  "https://www.youtube.com/embed/dueIWQj76kI",
  "https://www.youtube.com/embed/6cwld0ZDwUQ",
  "https://www.youtube.com/embed/vtLeEPYmQ7A",
  "https://www.youtube.com/embed/CpFk-AX-I_U",
  "https://www.youtube.com/embed/o1WAlUnMORA",
  "https://www.youtube.com/embed/9NlFps3vAdw",
  "https://www.youtube.com/embed/-sZGAHAlBJw",
  "https://www.youtube.com/embed/EXo5OhUn5Sg",
  "https://www.youtube.com/embed/igiZhT7Iya8",
  "https://www.youtube.com/embed/mIGDhqKSe2s",
  "https://www.youtube.com/embed/Vvtj_FeKnDM",
  "https://www.youtube.com/embed/xtS0qBK-e5g",
  "https://www.youtube.com/embed/VD_Q_Jd5ZkM",
  "https://www.youtube.com/embed/nDmpad5WM1o",
  "https://www.youtube.com/embed/ncuaKYlsUBk",
  "https://www.youtube.com/embed/Cff78V5n8po",
  "https://www.youtube.com/embed/DWneB8iwE50",
  "https://www.youtube.com/embed/0srGazquYL8",
];

// Transform embed URLs to watch URLs
const watchUrls = embedUrls.map(transformToWatchFormat);

// Download videos
watchUrls.forEach(async (url, index) => {
  // Use the original video title as the output file name
  await downloadVideo(url, `videos/${index + 5}.mp4`);
});

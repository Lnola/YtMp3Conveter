const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const PlaylistSummary = require("youtube-playlist-summary");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/aaa", (req, res) => {
  const URL = req.query.URL;

  res.header("Content-Disposition", 'attachment; filename="video.mp3"');

  // const info=

  // ytdl(URL, {
  //   format: "mp3",
  // }).pipe(res);
});

app.get("/api/download", (req, res) => {
  const URL = req.query.list;

  const config = {
    GOOGLE_API_KEY: "AIzaSyD7UBZYJgghoZpvaU8RU5qdvVU4G9eq7ug",
    PLAYLIST_ITEM_KEY: ["title", "videoUrl", "thumbnails"],
  };

  const ps = new PlaylistSummary(config);

  ps.getPlaylistItems(URL)
    .then((result) => {
      res.send(result.items);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

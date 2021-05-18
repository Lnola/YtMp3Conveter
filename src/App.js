import React, { useState } from "react";
import Axios from "axios";

const App = () => {
  const [input, setInput] = useState(
    "https://www.youtube.com/watch?v=ZnCFWlso-UQ&list=PL_Dm-xhk4f3HgEyYE9bC1YQsdHTMKmseP"
  );

  const [videos, setVideos] = useState([]);

  const handleConvert = () => {
    // if (input.length !== 0)
    //   Axios.get(`/api/download?URL=${input}`).then((res) =>
    //     setVideos(res.data)
    //   );
    // window.location.href = `http://localhost:5000/api/aaa?URL=${input}`;

    Axios.get(`/api/aaa?URL=${input}`).then((res) => {
      console.log(res.data);

      window.location.href = `http://localhost:5000/api/one?info=${JSON.stringify(
        res.data
      )}`;
    });
  };

  console.log(videos);

  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleConvert}>Convert</button>

      {videos.map((video, index) => (
        <div key={index}>
          <img src={video.thumbnails.default.url} alt="thumbnail" />
          <span>{video.title}</span>
        </div>
      ))}
    </>
  );
};

export default App;

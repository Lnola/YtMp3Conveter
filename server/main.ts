// import fs from 'fs';
import ytdl from 'ytdl-core';

const videoUrl = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';

const stream = ytdl(videoUrl, { filter: 'audioonly' });
console.log(stream);

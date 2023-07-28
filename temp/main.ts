import fs from 'fs';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';

const outputFile = 'audio.mp3';
const videoUrl = 'https://www.youtube.com/watch?v=xvFZjo5PgG0';

const stream = ytdl(videoUrl, { filter: 'audioonly' });

ffmpeg(stream)
  .toFormat('mp3')
  .on('error', (err) => {
    console.error('An error occurred:', err.message);
  })
  .on('end', () => {
    console.log('Finished converting to MP3 format.');
  })
  .addOutputOption('-metadata', 'title="Stairway to Heaven"')
  .addOutputOption('-metadata', 'artist="Zepp"')
  .addOutputOption('-metadata', 'album="These ones"')
  .pipe(fs.createWriteStream(outputFile))
  .on('error', (err) => {
    console.error('An error occurred while saving the file:', err.message);
  })
  .on('finish', () => {
    console.log('File saved successfully.');
  });

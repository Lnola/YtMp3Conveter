import fs from 'fs';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { MetadataDto } from '../../../types/audio';

type Query = MetadataDto;

export default defineEventHandler((event) => {
  const { videoUrl, artist, category, title } = getQuery(event) as Query;
  const outputFile = `public/audio/${title}.mp3`;

  const stream = ytdl(videoUrl, { filter: 'audioonly' });

  ffmpeg(stream)
    .toFormat('mp3')
    .on('error', (error) => {
      console.error('An error occurred:', error.message);
    })
    .on('end', () => {
      console.log('Finished converting to MP3 format.');
    })
    .addOutputOption('-metadata', `artist="${artist}"`)
    .addOutputOption('-metadata', `category="${category}"`)
    .addOutputOption('-metadata', `title="${title}"`)
    // .addOutputOption('-metadata', 'album="These ones"')
    .pipe(fs.createWriteStream(outputFile))
    .on('error', (error) => {
      console.error('An error occurred while saving the file:', error.message);
    })
    .on('finish', () => {
      console.log('File saved successfully.');
    });

  return { stream: `/audio/${title}.mp3` };
});

import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { Metadata } from '../../../types/audio';

type Query = Metadata;

const formatAndSaveFile = (
  stream: Readable,
  metadata: Omit<Query, 'videoUrl' | 'filename'>,
  outputFile: string
) => {
  return new Promise<void>((resolve, reject) =>
    ffmpeg(stream)
      .toFormat('mp3')
      .on('error', (error) => {
        console.error('An error occurred formatting the file:', error.message);
        reject(error.message);
      })
      .on('end', () => {
        console.log('Finished converting to MP3 format.');
      })
      .addOutputOption('-metadata', `artist="${metadata.artist}"`)
      .addOutputOption('-metadata', `album="${metadata.album}"`)
      .addOutputOption('-metadata', `category="${metadata.category}"`)
      .addOutputOption('-metadata', `title="${metadata.title}"`)
      // TODO: add a job to delete the file after x time
      .saveToFile(`public/${outputFile}`)
      .on('error', (error) => {
        console.error('An error occurred saving the file:', error.message);
        reject(error.message);
      })
      .on('end', () => {
        console.log('File saved successfully.');
        resolve();
      })
  );
};

export default defineEventHandler(async (event) => {
  const { videoUrl, filename, ...query } = getQuery(event) as Query;
  const outputFile = `/audio/${filename}.mp3`;
  const stream = ytdl(videoUrl, { filter: 'audioonly' });
  await formatAndSaveFile(stream, query, outputFile);
  return { outputFile };
});

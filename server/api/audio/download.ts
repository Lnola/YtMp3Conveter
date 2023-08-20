import fs from 'fs';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { DownloadFile, Metadata } from '../../../types/audio';

type Query = Metadata;

const deleteFile = (outputFile: string) => {
  fs.unlink(`public/${outputFile}`, (err) => {
    if (err) throw err;
    console.log('Deleted file successfully!');
  });
};

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
      .addOutputOption('-metadata', `year="${metadata.year}"`)
      .addOutputOption('-metadata', `genre="${metadata.genre}"`)
      // TODO: add a job to delete the file after x time
      .saveToFile(`public/${outputFile}`)
      .on('error', (error) => {
        console.error('An error occurred saving the file:', error.message);
        reject(error.message);
      })
      .on('end', () => {
        console.log('File saved successfully.');

        setTimeout(() => {
          deleteFile(outputFile);
        }, 60000);
        resolve();
      })
  );
};

export default defineEventHandler(async (event): Promise<DownloadFile> => {
  const { videoUrl, filename, ...query } = getQuery(event) as Query;
  const outputFile = `/audio/${filename}.mp3`;
  console.log('Conversion started!');
  const stream = ytdl(videoUrl, { filter: 'audioonly' });
  await formatAndSaveFile(stream, query, outputFile);
  return { outputUrl: outputFile, filename };
});

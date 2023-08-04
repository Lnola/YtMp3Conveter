import ytdl from 'ytdl-core';
import { MetadataDto } from '../../../types/audio';

export type Query = {
  videoUrl: string;
};

export default defineEventHandler(async (event): Promise<MetadataDto> => {
  const { videoUrl } = getQuery(event) as Query;
  const { videoDetails } = await ytdl.getInfo(videoUrl);
  const { author, category, thumbnails, title } = videoDetails;
  const artist = author.name;
  const thumbnail = thumbnails[thumbnails.length - 1].url;
  return { artist, category, thumbnail, title };
});

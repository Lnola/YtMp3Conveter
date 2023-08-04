import ytdl from 'ytdl-core';
import { Metadata } from '../../../types/audio';

export type Query = {
  videoUrl: string;
};

type MetadataDto = Pick<
  Metadata,
  'videoUrl' | 'artist' | 'category' | 'thumbnail' | 'title'
>;

export default defineEventHandler(async (event): Promise<MetadataDto> => {
  const { videoUrl } = getQuery(event) as Query;
  const { videoDetails } = await ytdl.getInfo(videoUrl);
  const { author, category, thumbnails, title } = videoDetails;
  const artist = author.name;
  const thumbnail = thumbnails[thumbnails.length - 1].url;
  return { videoUrl, artist, category, thumbnail, title };
});

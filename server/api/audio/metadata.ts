import ytdl from 'ytdl-core';

type Query = {
  videoUrl: string;
};

type MetadataDto = {
  artist: string;
  category: string;
  thumbnail: string;
  title: string;
};

export default defineEventHandler(async (event): Promise<MetadataDto> => {
  const { videoUrl } = getQuery(event) as Query;
  const { videoDetails } = await ytdl.getInfo(videoUrl);
  const { author, category, thumbnails, title } = videoDetails;
  const artist = author.name;
  const thumbnail = thumbnails[thumbnails.length - 1].url;
  return { artist, category, thumbnail, title };
});

import { MetadataDto } from 'types/audio';

const initMetadata = (): MetadataDto => ({
  videoUrl: '',
  artist: '',
  category: '',
  thumbnail: '',
  title: '',
});

export const useMetadata = () =>
  useState<MetadataDto>('metadata', initMetadata);

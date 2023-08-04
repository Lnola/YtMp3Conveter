import { Metadata } from 'types/audio';

const initMetadata = (): Metadata => ({
  videoUrl: '',
  album: '',
  artist: '',
  category: '',
  filename: '',
  thumbnail: '',
  title: '',
});

export const useMetadata = () => useState<Metadata>('metadata', initMetadata);

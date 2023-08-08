import { DownloadFile, Metadata } from 'types/audio';
import { Nullable } from 'types/helper';

const initMetadata = (): Metadata => ({
  videoUrl: '',
  album: '',
  artist: '',
  category: '',
  filename: '',
  thumbnail: '',
  title: '',
  year: '',
  genre: '',
});

const initDownloadFile = (): Nullable<DownloadFile> => null;

export const useMetadata = () => useState<Metadata>('metadata', initMetadata);

export const useDownloadFile = () =>
  useState<Nullable<DownloadFile>>('download-file', initDownloadFile);

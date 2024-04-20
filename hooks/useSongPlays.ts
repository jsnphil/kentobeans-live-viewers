import useSWRImmutable from 'swr/immutable';
import { fetcher, useKentobot } from '../utils/kentobotApi';

export const useSongPlays = (youtubeId: string) => {
  const { data, error, isLoading } = useKentobot(`song-plays/${youtubeId}`);

  return {
    data,
    error,
    isLoading
  };
};

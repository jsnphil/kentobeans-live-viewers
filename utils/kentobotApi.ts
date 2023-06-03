import axios from 'axios';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';

const baseUrl = process.env.NEXT_PUBLIC_KENTOBOT_API_HOST;
const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

const fetcher = async (url: string) =>
  await axios.get(url).then((res) => res.data);

export const useKentobot = (path: string) => {
  const url = `https://${baseUrl}/${env}/${path}`;

  // const { data, error, isLoading } = useSWR(url, fetcher);
  const { data, error, isLoading } = useSWRImmutable(url, fetcher);

  return {
    data,
    error,
    isLoading
  };
};

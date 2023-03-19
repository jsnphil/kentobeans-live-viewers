import axios from 'axios';
import useSWR from 'swr';

const baseUrl = process.env.NEXT_PUBLIC_KENTOBOT_API_HOST;
const fetcher = async (url: string) =>
  await axios.get(url).then((res) => res.data);

export const useKentobot = (path: string) => {
  const url = `https://${baseUrl}/dev/${path}`;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading
  };
};

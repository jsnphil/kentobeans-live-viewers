import SotnSonglist from './_components/SotnSonglist';

async function getSotnSonglist() {
  // TODO Update with prod and staging domains
  const res = await fetch(
    `https://6dpo5kprt9.execute-api.us-east-1.amazonaws.com/prod/song-of-the-night/winning-requests`
  );

  const sotnSonglistData = await res.json();
  return sotnSonglistData;
}

export default async function Page() {
  const sotnSonglistData = await getSotnSonglist();
  return (
    <>
      <SotnSonglist songlist={sotnSonglistData.winners} />
    </>
  );
}

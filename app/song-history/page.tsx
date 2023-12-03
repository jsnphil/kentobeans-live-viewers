import SongHistoryTable from './_components/SongHistoryTable';

async function getSongData() {
  // TODO Update with prod and staging domains
  const res = await fetch(
    `https://7bnaekf3f0.execute-api.us-east-1.amazonaws.com/dev/song-requests`,
    {
      cache: 'no-cache'
    }
  );

  const songHistoryData = await res.json();
  return songHistoryData;
}

export default async function Page() {
  const songHistoryData = await getSongData();
  return (
    <>
      <div className='container mt-5'>
        <SongHistoryTable songData={songHistoryData.requests} />{' '}
      </div>
    </>
  );
}

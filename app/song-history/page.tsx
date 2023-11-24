import SongHistoryTable from './_components/SongHistoryTable';
import { SongRequest } from '../../@types';
import { TableColumn } from 'react-data-table-component';

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
        <SongHistoryTable songData={songHistoryData.requests} />
      </div>
      <div className='pt-3 pb-3 text-center fs-6'>
        Last updated: {new Date(songHistoryData.generated).toLocaleString()}
      </div>
    </>
  );
}

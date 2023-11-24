import { NextPage } from 'next';
import { Alert } from 'react-bootstrap';
import { TableColumn } from 'react-data-table-component';
import LoadingSpinner from '../components/LoadingSpinner';
import SongHistoryTable from '../app/song-history/_components/SongHistoryTable';
import { useKentobot } from '../utils/kentobotApi';
import { SongRequest } from '../@types';

const columns: TableColumn<SongRequest>[] = [
  {
    id: 'songTitle',
    name: 'Song Title',
    selector: (row: SongRequest) => row.title,
    sortable: true
  }
];

const SongHistory: NextPage = () => {
  const { data, error, isLoading } = useKentobot('song-requests');

  {
    error && (
      <Alert key='danger' variant='danger'>
        Unable to load song history...
      </Alert>
    );
  }

  if (!data || isLoading) {
    return <LoadingSpinner message={'Loading Song History...'} />;
  }

  const requests = data?.requests as SongRequest[];

  return (
    <>
      <div className='container mt-5'>
        <SongHistoryTable data={requests} columns={columns} />
      </div>
      <div className='pt-3 pb-3 text-center fs-6'>
        Last updated:
        {new Date(data.generated).toLocaleString()}
      </div>
    </>
  );
};

export default SongHistory;

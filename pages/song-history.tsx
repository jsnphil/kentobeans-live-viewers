import { NextPage } from 'next';
import { Alert, Spinner } from 'react-bootstrap';
import { TableColumn } from 'react-data-table-component';

import useSWR from 'swr';
import LoadingSpinner from '../components/LoadingSpinner';
import SongHistoryTable from '../components/SongHistoryTable';
import { formatDate } from '../libs/common';
import { SongRequest } from '../libs/types';
import { useKentobot } from '../utils/kentobotApi';

const kentobotApiHost = process.env.KENTOBOT_API_HOST;

const columns: TableColumn<SongRequest>[] = [
  {
    id: 'requester',
    name: 'Requested By',
    selector: (row: SongRequest) => row.requester,
    sortable: true
  },
  {
    id: 'requestTitle',
    name: 'Request Title',
    selector: (row: SongRequest) => row.songTitle,
    sortable: true
  },
  {
    id: 'playDate',
    name: 'Played On',
    selector: (row: SongRequest) => row.playDate,
    sortable: true,
    right: true,
    format: (row: SongRequest) => formatDate(row.playDate)
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

  if (!data && isLoading) {
    return <LoadingSpinner message={'Loading Song History...'} />;
  }

  const requests = data?.songRequests as SongRequest[];

  return (
    <>
      <div className='container pt-5'>
        <SongHistoryTable data={requests} columns={columns} />
      </div>
    </>
  );
};

export default SongHistory;

import { NextPage } from 'next';
import { Alert, Spinner } from 'react-bootstrap';
import { TableColumn } from 'react-data-table-component';

import useSWR from 'swr';
import LoadingSpinner from '../components/LoadingSpinner';
import SongHistoryTable from '../components/SongHistoryTable';
import { formatDate } from '../libs/common';
import { SongRequest } from '../libs/types';

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
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    'https://41omotk1zh.execute-api.us-east-1.amazonaws.com/dev/song-requests',
    fetcher
  );

  {
    error && (
      <Alert key='danger' variant='danger'>
        Unable to load song history...
      </Alert>
    );
  }

  if (!data) {
    return <LoadingSpinner message={'Loading Song History...'} />;
  }

  const requests = data.songRequests as SongRequest[];

  return (
    <>
      <div className='container pt-5'>
        <SongHistoryTable data={requests} columns={columns} />
      </div>
    </>
  );
};

export default SongHistory;

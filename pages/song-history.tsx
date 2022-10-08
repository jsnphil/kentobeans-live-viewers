import { NextPage } from 'next';
import DataTable from 'react-data-table-component';
import useSWR from 'swr';

interface DataRow {
  requester: string;
  songTitle: string;
  season: number;
  playDate: string;
  sotnContender: boolean;
  sotnWinenr: boolean;
  sotsWinner: boolean;
}

interface SongRequest {
  requester: string;
  songTitle: string;
  season: number;
  playDate: string;
  sotnContender: boolean;
  sotnWinenr: boolean;
  sotsWinner: boolean;
}

const columns = [
  {
    name: 'Requested By',
    selector: (row: DataRow) => row.requester,
    sortable: true
  },
  {
    name: 'Request Title',
    selector: (row: DataRow) => row.songTitle,
    sortable: true
  },
  {
    name: 'Played On',
    selector: (row: DataRow) => row.playDate,
    sortable: true
  },
  {
    name: 'Season',
    selector: (row: DataRow) => row.season,
    sortable: true
  }
];

const ExpandedComponent = ({ data }: any) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const SongHistory: NextPage = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  console.log('Fetching data');
  const { data, error } = useSWR(
    'https://41omotk1zh.execute-api.us-east-1.amazonaws.com/dev/song-requests',
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const requests = data.songRequests as SongRequest[];

  const numberOfRequests = data.total;

  return (
    <>
      <p>Found {numberOfRequests} songs!</p>
      <DataTable
        columns={columns}
        data={requests}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='500px'
        highlightOnHover
        striped
        expandOnRowClicked
      />
    </>
  );
};

export default SongHistory;

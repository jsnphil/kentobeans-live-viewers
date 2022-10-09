import { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

import useSWR from 'swr';
import DataTableFilter from '../components/DataTableFilter';
import SongHistoryTable from '../components/SongHistoryTable';

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
  _id: number;
  youtubeId: string;
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
    id: 'requester',
    name: 'Requested By',
    selector: (row: DataRow) => row.requester,
    sortable: true
  },
  {
    id: 'requestTitle',
    name: 'Request Title',
    selector: (row: DataRow) => row.songTitle,
    sortable: true
  },
  {
    id: 'playDate',
    name: 'Played On',
    selector: (row: DataRow) => row.playDate,
    sortable: true,
    right: true,
    format: (row: DataRow) => {
      const date = new Date(row.playDate);
      return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join(
        '/'
      );
    }
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
    return (
      <>
        <div className='pt-5 d-flex align-items-center justify-content-center'>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading Song History</span>
          </Spinner>
        </div>
      </>
    );
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

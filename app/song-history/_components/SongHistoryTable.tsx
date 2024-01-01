'use client';

import { useEffect, useMemo, useState } from 'react';
import Iframe from 'react-iframe';
import DataTable, {
  ExpanderComponentProps,
  TableColumn
} from 'react-data-table-component';
import DateTableFilter from './DataTableFilter';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faTrophy, faCrown } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../libs/common';
import { Song, SongRequest } from '../../../@types';
import LoadingSpinner from '../../../components/LoadingSpinner';
import axios from 'axios';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';

export interface SongHistoryTableProps {
  songData: Song[];
}

const columns: TableColumn<Song>[] = [
  {
    id: 'songTitle',
    name: 'Song Title',
    selector: (row: Song) => row.title
  }
];

const fetcher = async (url: string) =>
  await axios.get(url).then((res) => res.data);

const SongHistoryTable = (props: SongHistoryTableProps) => {
  const [loader, setLoader] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = props.songData?.filter(
    (item) => item.title.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <DateTableFilter
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const SongInfoCard = ({ data }: ExpanderComponentProps<Song>) => {
    // TODO Move to a custom hook
    const url = `https://031siirl26.execute-api.us-east-1.amazonaws.com/dev/song-requests/plays/${data.youtubeId}`;
    const playDataResp = useSWRImmutable(url, fetcher);

    if (playDataResp.error) {
      return <div>failed to load</div>;
    }

    if (playDataResp.isLoading) {
      return <LoadingSpinner message='Loading song data' />;
    }

    if (playDataResp.data) {
      return (
        <>
          <Card className='text-center'>
            <Card.Body>
              <Card.Title>{data.title}</Card.Title>

              <Card.Text className='pt-2'>
                <Iframe
                  url={`https://www.youtube.com/embed/${data.youtubeId}`}
                  title={data.title}
                  loading={'lazy'}
                />
              </Card.Text>
              <Card.Text>
                <Container>
                  <Row className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight'>
                    <Col>Requested By</Col>
                    <Col>Requested On</Col>
                  </Row>
                  {playDataResp.data.items.map((play, index: number) => (
                    <Row key={index}>
                      <Col>{play.requestedBy}</Col>
                      <Col suppressHydrationWarning>
                        {formatDate(play.date)}
                        {play.sotnContender && (
                          <>
                            &nbsp;
                            <FontAwesomeIcon
                              icon={faAward}
                              title='Song of the Night Contender'
                            />
                          </>
                        )}
                        {play.sotnContender && (
                          <>
                            &nbsp;
                            <FontAwesomeIcon
                              icon={faTrophy}
                              title='Song of the Night Winner'
                            />
                          </>
                        )}
                        {play.sotnContender && (
                          <>
                            &nbsp;
                            <FontAwesomeIcon
                              icon={faCrown}
                              title='Song of the Season Winner'
                            />
                          </>
                        )}
                      </Col>
                    </Row>
                  ))}
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      );
    }
  };

  // Hold loading the table until the page is rendered
  useEffect(() => {
    setLoader(false);
  }, []);

  // render
  if (loader) {
    return <LoadingSpinner message='Loading song request history' />;
  } else {
    return (
      <DataTable
        title='Song Request History'
        columns={columns}
        data={filteredItems}
        striped
        pagination
        subHeader
        subHeaderComponent={subHeaderComponent}
        expandableRows
        expandableRowsComponent={SongInfoCard}
        responsive
        fixedHeader
        highlightOnHover
      />
    );
  }
};

export default SongHistoryTable;

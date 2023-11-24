'use client';

import { useMemo, useState } from 'react';
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
import { SongRequest } from '../../../@types';

export interface SongHistoryTableProps {
  songData: SongRequest[];
}

const columns: TableColumn<SongRequest>[] = [
  {
    id: 'songTitle',
    name: 'Song Title',
    selector: (row: SongRequest) => row.song.title
    // sortable: true
  }
];

const SongHistoryTable = (props: SongHistoryTableProps) => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = props.songData?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
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

  const SongInfoCard = ({ data }: ExpanderComponentProps<SongRequest>) => (
    <>
      <Card className='text-center'>
        <Card.Body>
          <Card.Title>{data.song.title}</Card.Title>

          <Card.Text className='pt-2'>
            <Iframe
              url={`https://www.youtube.com/embed/${data.song.youtubeId}`}
              title={data.song.youtubeId}
              loading={'lazy'}
            />
          </Card.Text>
          <Card.Text>
            <Container>
              <Row className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight'>
                <Col>Requested By</Col>
                <Col>Requested On</Col>
              </Row>
              {data.songPlays.map((play, index) => (
                <Row key={index}>
                  <Col>{play.username}</Col>
                  <Col>
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

  return (
    <DataTable
      title='Song Request History'
      columns={columns}
      data={filteredItems}
      // defaultSortFieldId='playDate'
      // defaultSortAsc={false}
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
};

export default SongHistoryTable;

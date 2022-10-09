import { useMemo, useState } from 'react';
import Iframe from 'react-iframe';

import DataTable, {
  ExpanderComponentProps,
  TableColumn
} from 'react-data-table-component';
import DateTableFilter from './DataTableFilter';
import { Button, Card, Col, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faTrophy, faCrown } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../libs/common';
import { SongRequest, SongRequestDataRow } from '../libs/types';

export interface SongHistoryTableProps {
  data: SongRequest[];
  columns: TableColumn<SongRequest>[];
}

const SongHistoryTable = (props: SongHistoryTableProps) => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = props.data.filter(
    (item: SongRequest) =>
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
          <Card.Title>{data.songTitle}</Card.Title>

          <Card.Text className='pt-2'>
            <Iframe
              url={`https://www.youtube.com/embed/${data.youtubeId}`}
              title={data.songTitle}
              loading={'lazy'}
            />
          </Card.Text>
          <Card.Text>
            <Row>
              <Col>Requested By: {data.requester}</Col>
            </Row>
            {data.artist && (
              <Row>
                <Col>Artist: {data.artist}</Col>
              </Row>
            )}
            {data.featuredArtist && (
              <Row>
                <Col>Feat. Artist: {data.featuredArtist}</Col>
              </Row>
            )}
            {data.songYear && (
              <Row>
                <Col>Year: {data.songYear}</Col>
              </Row>
            )}
            <Row>
              <Col>Played On: {formatDate(data.playDate)}</Col>
            </Row>
            <Row>
              <Col>Song of the Night Season: {data.season}</Col>
            </Row>
            {data.sotnContender && (
              <Row>
                <Col>
                  <FontAwesomeIcon icon={faAward} /> &nbsp; Song of the Night
                  Contender
                </Col>
              </Row>
            )}
            {data.sotnWinner && (
              <Row>
                <Col>
                  <FontAwesomeIcon icon={faTrophy} /> &nbsp; Song of the Night
                  Winner
                </Col>
              </Row>
            )}
            {data.sotsWinner && (
              <Row>
                <Col>
                  <FontAwesomeIcon icon={faCrown} /> &nbsp; Song of the Season
                  Winner
                </Col>
              </Row>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );

  return (
    <DataTable
      title='Song Request History'
      columns={props.columns}
      data={filteredItems}
      defaultSortFieldId='playDate'
      defaultSortAsc={false}
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

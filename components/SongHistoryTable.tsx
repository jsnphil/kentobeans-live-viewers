import { useMemo, useState } from 'react';
import Iframe from 'react-iframe';

import DataTable, { TableColumn } from 'react-data-table-component';
import DateTableFilter from './DataTableFilter';
import { Col, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faTrophy, faCrown } from '@fortawesome/free-solid-svg-icons';

const SongHistoryTable = (props: any) => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = props.data.filter(
    (item: any) =>
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

  const ExpandedComponent = ({ data }: any) => (
    <>
      <div className='container d-flex py-5 align-items-center justify-content-center'>
        <Row>
          <Col span={6} className='my-auto mx-auto'>
            <Iframe
              url={`https://www.youtube.com/embed/${data.youtubeId}`}
              title={data.title}
              loading={'lazy'}
            />
          </Col>
          <Col span={6} className='align-items-center'>
            <Row>
              <Col>{data.songTitle}</Col>
            </Row>

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
              <Col>Played On: {data.playDate}</Col>
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
          </Col>
        </Row>
      </div>
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
      expandableRowsComponent={ExpandedComponent}
      responsive
      fixedHeader
      highlightOnHover
    />
  );
};

export default SongHistoryTable;

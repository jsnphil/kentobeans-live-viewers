import { Row, Col } from 'react-bootstrap';
import { secondsToMinutes } from '../libs/common';
import { SongRequest } from '../libs/types';
import SongQueueTableHeading from './SongQueueTableHeading';

interface CurrentSongProps {
  currentSong: SongRequest | undefined;
}

export const CurrentSong = (currentSongProps: CurrentSongProps) => {
  const { currentSong } = currentSongProps;

  return (
    <>
      <Row>
        <SongQueueTableHeading>Now Playing</SongQueueTableHeading>
      </Row>
      {currentSong ? (
        <>
          <Row>
            {currentSong ? (
              <>
                <Col md={9}>{currentSong.title}</Col>
                <Col md={2}>{currentSong.requestedBy}</Col>
                <Col md={1}>{secondsToMinutes(currentSong.length)}</Col>
              </>
            ) : (
              <Col md={12}>Nothing playing</Col>
            )}
          </Row>
        </>
      ) : (
        <>
          <Col>Nothing playing</Col>
        </>
      )}
    </>
  );
};

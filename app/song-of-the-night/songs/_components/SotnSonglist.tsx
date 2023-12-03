import { Col, Container, Row } from 'react-bootstrap';
import { SotnWinner } from '../../../../@types';
import SotnPlaylists from './SotnPlaylists';
import styles from '../../sotn.module.css';
import { getArtistValue, getDate } from '../../../../utils/sotn-utils';

export interface SotnSonglistData {
  songlist: SotnWinner[];
}

export default function SotnSonglist(props: SotnSonglistData) {
  return (
    <>
      <div className='d-none d-xl-block mb-3'>
        <h1>Complete Song of the Night History</h1>
        <SotnPlaylists />
      </div>
      <Container>
        <div className='pb-3'>
          <Row
            className={`${styles.winnersheading} ${styles.heading} roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight`}
          >
            <Col className='roundTL' xs={1}></Col>
            <Col xs={4}>Song Title</Col>
            <Col xs={4}>Artist</Col>
            <Col>Year</Col>
            <Col>Stream Date</Col>
          </Row>
        </div>
        {props.songlist.map((song: SotnWinner, index: number) => (
          <div className={`${styles.winnerRow}`} key={index}>
            <a
              href={`https://youtu.be/${song.youtubeId}`}
              target='_blank'
              rel='noreferrer'
            >
              <Row>
                <Col xs={1}>{index + 1}</Col>
                <Col xs={4}>{song.title}</Col>
                <Col xs={4}>
                  {getArtistValue(song.artist, song.featuredArtist)}
                </Col>
                <Col>{song.year}</Col>
                <Col>{getDate(song.streamDate)}</Col>
              </Row>
            </a>
          </div>
        ))}
      </Container>
    </>
  );
}

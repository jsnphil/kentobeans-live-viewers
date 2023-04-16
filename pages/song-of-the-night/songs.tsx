import { NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './sotn.module.css';
import { getArtistValue, getDate } from '../../utils/sotn-utils';
import { useKentobot } from '../../utils/kentobotApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import { SotnWinner } from '../../@types';

const SongOfTheNightSongs: NextPage = () => {
  const { data, error, isLoading } = useKentobot(`/song-of-the-night/winners`);

  const sortedWinners = data?.winners.sort(
    (song1: SotnWinner, song2: SotnWinner) =>
      new Date(song1.streamDate).getTime() -
      new Date(song2.streamDate).getTime()
  );

  return (
    <>
      <main>
        <div className='d-none d-xl-block mb-5'>
          <h1>Complete Song of the Night History</h1>
        </div>
        {!data || isLoading ? (
          <LoadingSpinner message='Loading Song of the Night Data' />
        ) : (
          <>
            <div className={`${styles.sotnTable}`}>
              <Container>
                <div className='pb-3'>
                  <Row
                    className={`${styles.winnersheading} ${styles.heading} roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight`}
                  >
                    <Col className='roundTL' xs={4}>
                      Song Title
                    </Col>
                    <Col xs={4}>Artist</Col>
                    <Col>Year</Col>
                    <Col>Stream Date</Col>
                  </Row>
                </div>
                {data?.winners.map((song: SotnWinner, index: number) => (
                  <div className={`${styles.winnerRow}`} key={index}>
                    <a
                      href={`https://youtu.be/${song.youtubeId}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Row>
                        <Col xs={4}>{`${index + 1} - ${song.title}`}</Col>
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
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default SongOfTheNightSongs;

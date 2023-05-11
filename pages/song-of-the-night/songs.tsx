import { NextPage } from 'next';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import styles from './sotn.module.css';
import { getArtistValue, getDate } from '../../utils/sotn-utils';
import { useKentobot } from '../../utils/kentobotApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import { SotnWinner } from '../../@types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpotify,
  faApple,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { faAward, faTrophy, faCrown } from '@fortawesome/free-solid-svg-icons';

const SongOfTheNightSongs: NextPage = () => {
  const { data, error, isLoading } = useKentobot(
    `/song-of-the-night/winning-requests`
  );

  const sortedWinners = data?.winners.sort(
    (song1: SotnWinner, song2: SotnWinner) =>
      new Date(song1.streamDate).getTime() -
      new Date(song2.streamDate).getTime()
  );

  return (
    <>
      <main>
        <div className='d-none d-xl-block mb-3'>
          <h1>Complete Song of the Night History</h1>
        </div>
        {!data || isLoading ? (
          <LoadingSpinner message='Loading Song of the Night Data' />
        ) : (
          <>
            <div className={`${styles.sotnTable}`}>
              <Nav className='justify-content-center pb-3'>
                <Nav.Item>
                  <Nav.Link
                    href='https://open.spotify.com/user/kmccarthy-10/playlist/6dQZxnjBTmuV8K5ncmT31B?si=wT26ziBKRemnECwToIlrhg'
                    target='_blank'
                  >
                    <FontAwesomeIcon icon={faSpotify} /> Spotify
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href='https://music.apple.com/ca/playlist/kentobeans-sotn-winners/pl.u-LdbqqlgukqdRmr'
                    target='_blank'
                  >
                    <FontAwesomeIcon icon={faApple} /> Apple Music
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href='https://www.youtube.com/channel/UCjBaONaNwiczErfou7hPRsg/playlists?view=50&sort=dd&shelf_id=1'
                    target='_blank'
                  >
                    <FontAwesomeIcon icon={faYoutube} /> YouTube
                  </Nav.Link>
                </Nav.Item>
              </Nav>
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

import { NextPage } from 'next';
import { useState } from 'react';
import { Accordion, Col, Container, Form, Row } from 'react-bootstrap';
import styles from './sotn.module.css';
import sotnData from '../../data/sotn-response.json';

type SotnProps = {
  winners: SotnWinnerData[];
};

type SotnWinner = {
  readonly requestId: string;
  readonly requester: string;
  readonly youtubeId: string;
  readonly artist: string;
  readonly year: string;
  readonly featuredArtist: string;
  readonly sotsWinner: boolean;
  readonly playDate: string;
  readonly title?: string;
};

type SotnWinnerData = {
  readonly username: string;
  readonly songs: SotnWinner[];
};

const kentobotApiHost = process.env.KENTOBOT_API_HOST;

export async function getServerSideProps() {
  // TODO extract this into a function(s) that can be called from the state changes as well

  const res = await fetch(
    `https://${kentobotApiHost}/dev/song-of-the-night/winners`
  );
  // const data = await res.json();
  const data = JSON.parse(JSON.stringify(sotnData));

  let winnersMap = new Map<string, any[]>();

  data.winners.forEach((winner: SotnWinner, index: number) => {
    const requester = winner.requester.toLowerCase();

    if (winnersMap.has(requester)) {
      winnersMap.get(requester)?.push(winner);
    } else {
      winnersMap.set(requester, [winner]);
    }
  });

  let sotnWinners: SotnWinnerData[] = [];

  winnersMap.forEach((songs, key) => {
    songs.sort(
      (song1: SotnWinner, song2: SotnWinner) =>
        new Date(song2.playDate).getTime() - new Date(song1.playDate).getTime()
    );

    sotnWinners.push({
      username: key,
      songs: songs
    });
  });

  sotnWinners.sort(
    (winner1, winner2) => winner2.songs.length - winner1.songs.length
  );

  return {
    props: {
      winners: sotnWinners
    }
  };
}

const currentSeason = '12'; // TODO Get from AWS?
const SongOfTheNightStandings: NextPage<SotnProps> = ({ winners }) => {
  const [seasonState, setSeasonState] = useState(currentSeason);

  const handleMenuChange = async (event: any) => {
    event.preventDefault();

    setSeasonState(event.target.value);
  };

  const seasons = [];
  for (let season = Number.parseInt(currentSeason); season >= 1; season--) {
    seasons.push(season);
  }

  // TODO Move to a utility
  function getDate(playDate: string) {
    const date = new Date(playDate);

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <>
      <main>
        <div className='container d-xl-none d-xl-block mb-5 mt-5  aligns-items-center justify-content-center'>
          <div className='container mb-5 mt-5 aligns-items-center justify-content-center'>
            <Form>
              <Form.Group
                className='mb5 form-inline'
                controlId='seasonSelectorControl'
              >
                <Form.Label>Season:</Form.Label>

                <Form.Select id='seasonSelector' onChange={handleMenuChange}>
                  {seasons.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </div>

          <Accordion defaultActiveKey='0'>
            {winners.map((winner: SotnWinnerData, index: number) => (
              <Accordion.Item
                eventKey={new Number(index).toString()}
                key={index}
              >
                <Accordion.Header>
                  {winner.username} - {winner.songs.length}{' '}
                  {winner.songs.length == 1 ? 'win' : 'wins'}
                </Accordion.Header>
                <Accordion.Body>
                  {winner.songs!.map((song: SotnWinner, index: number) => (
                    <Row key={index}>
                      <Col>
                        <a
                          href={`https://youtu.be/${song.youtubeId}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {song.title}
                        </a>
                      </Col>
                      <Col>{getDate(song.playDate)}</Col>
                    </Row>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div className='d-none d-xl-block mb-5'>
          <div className='container d-flex aligns-items-center justify-content-center mb-5'>
            {/* TODO Convert this to CSS in sotn.modules.css file */}
            <div id='menuTop' className='innerContainer'>
              <button
                name='season12'
                className={`button ${styles.sotnSeasonButton} leftButtonA ${
                  seasonState === '12' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('12');
                }}
              >
                12
              </button>
              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '11' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('11');
                }}
              >
                11
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '10' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('10');
                }}
              >
                10
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '9' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('9');
                }}
              >
                9
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '8' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('8');
                }}
              >
                8
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '7' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('7');
                }}
              >
                7
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '6' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('6');
                }}
              >
                6
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '5' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('5');
                }}
              >
                5
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '4' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('4');
                }}
              >
                4
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '3' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('3');
                }}
              >
                3
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '2' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('2');
                }}
              >
                2
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} rightButtonA ${
                  seasonState === '1' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('1');
                }}
              >
                1
              </button>
            </div>
          </div>

          <Container>
            <div className='pb-3'>
              <Row className={`${styles.winnersheading} ${styles.heading}`}>
                <Col className='roundTL' xs={4}>
                  Song Title
                </Col>
                <Col xs={4}>Artist</Col>
                <Col>Year</Col>
                <Col>Stream Date</Col>
              </Row>
            </div>
            {winners.map((winner: SotnWinnerData, index: number) => (
              <div className='pb-5 rounded-circle' key={index}>
                <Row>
                  <Col className={`${styles.userHeading} ${styles.heading}`}>
                    {winner.username} - {winner.songs.length}{' '}
                    {winner.songs.length == 1 ? 'win' : 'wins'}
                  </Col>
                </Row>
                {winner.songs!.map((song: SotnWinner, index: number) => (
                  <div className={`${styles.winnerRow}`} key={index}>
                    <Row>
                      <Col xs={4}>
                        <a
                          href={`https://youtu.be/${song.youtubeId}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          {song.title}
                        </a>
                      </Col>
                      <Col xs={4}>
                        {getArtistValue(song.artist, song.featuredArtist)}
                      </Col>
                      <Col>{song.year}</Col>
                      <Col>{getDate(song.playDate)}</Col>
                    </Row>
                  </div>
                ))}
              </div>
            ))}
          </Container>
        </div>
      </main>
    </>
  );
};

// TODO Move this to a utility
const getArtistValue = (artist: string, featArtist?: string): string => {
  if (featArtist) {
    return `${artist.replaceAll('|', ' & ')} feat. ${featArtist.replaceAll(
      '|',
      ' & '
    )}`;
  } else {
    return artist.replaceAll('|', ' & ');
  }
};

export default SongOfTheNightStandings;

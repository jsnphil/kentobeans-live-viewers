import { NextPage } from 'next';
import { useState } from 'react';
import { Accordion, Col, Container, Form, Row } from 'react-bootstrap';
import styles from './sotn.module.css';
import sotnData from '../../data/sotn-response.json';
import { getArtistValue, getDate } from '../../utils/sotn-utils';

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

const seasonNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
  const seasonButtons = [];
  for (let season = Number.parseInt(currentSeason); season >= 1; season--) {
    seasons.push(season);
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

          <div className={`${styles.sotnTable}`}>
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
                      <a
                        href={`https://youtu.be/${song.youtubeId}`}
                        target='_blank'
                        rel='noreferrer'
                        key={index}
                      >
                        <Row>
                          <Col>{song.title}</Col>
                          <Col>{getDate(song.playDate)}</Col>
                        </Row>
                      </a>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
        <div className='d-none d-xl-block mb-5'>
          <div className='container d-flex aligns-items-center justify-content-center mb-5'>
            {/* TODO Convert this to CSS in sotn.modules.css file */}
            <div id='menuTop' className='innerContainer'>
              {seasons.map((seasonNumber, index) => (
                <button
                  name={`season${seasonNumber}`}
                  className={`button ${styles.sotnSeasonButton} ${
                    seasonState === Number(seasonNumber).toString()
                      ? 'selected'
                      : ''
                  }
                  
                  ${
                    index === 0
                      ? `${styles.roundedBottomLeft} ${styles.roundedTopLeft}`
                      : ''
                  }

                  ${
                    index === seasons.length - 1
                      ? `${styles.roundedBottomRight} ${styles.roundedTopRight}`
                      : ''
                  }
                  
                  `}
                  onClick={(e) => {
                    setSeasonState(Number(seasonNumber).toString());
                  }}
                  key={index}
                >
                  {seasonNumber}
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.sotnTable}`}>
            <Container>
              <div className='pb-3'>
                <Row
                  className={`${styles.winnersheading} ${styles.roundedTopLeft} ${styles.roundedBottomLeft} ${styles.roundedTopRight} ${styles.roundedBottomRight}`}
                >
                  <Col xs={4}>Song Title</Col>
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
                      <a
                        href={`https://youtu.be/${song.youtubeId}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <Row>
                          <Col xs={4}>{song.title}</Col>
                          <Col xs={4}>
                            {getArtistValue(song.artist, song.featuredArtist)}
                          </Col>
                          <Col>{song.year}</Col>
                          <Col>{getDate(song.playDate)}</Col>
                        </Row>
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </Container>
          </div>
        </div>
      </main>
    </>
  );
};

export default SongOfTheNightStandings;

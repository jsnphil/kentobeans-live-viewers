import { NextPage } from 'next';
import { useState } from 'react';
import { Accordion, Col, Container, Form, Row } from 'react-bootstrap';
import styles from './sotn.module.css';
import sotnData from '../../data/sotn-response.json';
import { getArtistValue, getDate } from '../../utils/sotn-utils';
import { useKentobot } from '../../utils/kentobotApi';
import LoadingSpinner from '../../components/LoadingSpinner';

type SotnProps = {
  winners: SotnWinnerData[];
};

type SotnWinner = {
  readonly youtubeId: string;
  readonly requester: string;
  readonly streamDate: string;
  readonly artist: string;
  readonly featuredArtist?: string;
  readonly year: string;
  readonly sotsWinner: boolean;
  readonly title?: string;
};

type SotnWinnerData = {
  readonly username: string;
  readonly songs: SotnWinner[];
};

function processSotnData(winnerData: SotnWinner[]) {
  // TODO extract this into a function(s) that can be called from the state changes as well

  console.log(JSON.stringify(winnerData, null, 2));
  let winnersMap = new Map<string, any[]>();

  winnerData.forEach((winner: SotnWinner, index: number) => {
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
        new Date(song2.streamDate).getTime() -
        new Date(song1.streamDate).getTime()
    );

    sotnWinners.push({
      username: key,
      songs: songs
    });
  });

  sotnWinners.sort(
    (winner1, winner2) => winner2.songs.length - winner1.songs.length
  );

  return sotnWinners;
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

  const { data, error, isLoading } = useKentobot(
    `/song-of-the-night/winners?season=${seasonState}`
  );

  let sotnData;
  if (data && !isLoading) {
    sotnData = processSotnData(data.winners);
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

          {!data || isLoading ? (
            <LoadingSpinner message='Loading Song of the Night Data' />
          ) : (
            <>
              <div className={`${styles.sotnTable}`}>
                <Accordion defaultActiveKey='0'>
                  {sotnData?.map((winner: SotnWinnerData, index: number) => (
                    <Accordion.Item
                      eventKey={new Number(index).toString()}
                      key={index}
                    >
                      <Accordion.Header>
                        {winner.username} - {winner.songs.length}{' '}
                        {winner.songs.length == 1 ? 'win' : 'wins'}
                      </Accordion.Header>
                      <Accordion.Body>
                        {winner.songs!.map(
                          (song: SotnWinner, index: number) => (
                            <a
                              href={`https://youtu.be/${song.youtubeId}`}
                              target='_blank'
                              rel='noreferrer'
                              key={index}
                            >
                              <Row>
                                <Col>{song.title}</Col>
                                <Col>{getDate(song.streamDate)}</Col>
                              </Row>
                            </a>
                          )
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </>
          )}
        </div>
        <div className='d-none d-xl-block'>
          <div className='container d-flex aligns-items-center justify-content-center mb-5'>
            {/* TODO Convert this to CSS in sotn.modules.css file */}
            {/* <div id='menuTop' className='innerContainer'> */}
            {seasons.map((seasonNumber, index) => (
              <button
                name={`season${seasonNumber}`}
                className={`button ${styles.sotnSeasonButton} ${
                  seasonState === Number(seasonNumber).toString()
                    ? 'selected'
                    : ''
                }
                  
                  ${index === 0 ? `roundedTopLeft roundedBottomLeft` : ''}

                  ${
                    index === seasons.length - 1
                      ? `roundedTopRight roundedBottomRight`
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
            {/* </div> */}
          </div>

          {!data || isLoading ? (
            <LoadingSpinner message='Loading Song of the Night Data' />
          ) : (
            <>
              <div className={`${styles.sotnTable}`}>
                <Container>
                  <div className='pb-3'>
                    <Row
                      className={`${styles.winnersheading} roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight`}
                    >
                      <Col xs={4}>Song Title</Col>
                      <Col xs={4}>Artist</Col>
                      <Col>Year</Col>
                      <Col>Stream Date</Col>
                    </Row>
                  </div>
                  {sotnData?.map((winner: SotnWinnerData, index: number) => (
                    <div className='pb-5 rounded-circle' key={index}>
                      <Row>
                        <Col className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight'>
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
                                {getArtistValue(
                                  song.artist,
                                  song.featuredArtist
                                )}
                              </Col>
                              <Col>{song.year}</Col>
                              <Col>{getDate(song.streamDate)}</Col>
                            </Row>
                          </a>
                        </div>
                      ))}
                    </div>
                  ))}
                </Container>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default SongOfTheNightStandings;

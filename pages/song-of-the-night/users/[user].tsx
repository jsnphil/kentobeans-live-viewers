import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Accordion, Col, Container, Row, Table } from 'react-bootstrap';
import { SotnStats, SotnWinner } from '../../../@types';
import styles from '../sotn.module.css';
import { getArtistValue, getDate } from '../../../utils/sotn-utils';
import { useKentobot } from '../../../utils/kentobotApi';
import LoadingSpinner from '../../../components/LoadingSpinner';

type SotnUserStats = {
  stats: SotnStats;
  wins: SeasonSongs[];
};

type SeasonSongs = {
  season: number;
  songs: SotnWinner[];
};

const SotnUserStats: NextPage = () => {
  const router = useRouter();
  const { user } = router.query;

  const { data, error, isLoading } = useKentobot(`/users/${user}`);

  console.log(data);

  return (
    <>
      <main>
        {!data || isLoading ? (
          <LoadingSpinner message='Loading Song of the Night Data' />
        ) : (
          <>
            <h1>{data?.username}</h1>
            <h2>User Summary</h2>
            <hr />
            <div className='container d-flex aligns-items-center justify-content-center mb-3'>
              <Table>
                <tbody>
                  <tr>
                    <td>Song of the Night Wins</td>
                    <td>{data?.sotnStats.wins}</td>
                  </tr>
                  <tr>
                    <td>Season Championship Wins</td>
                    <td>{data?.sotnStats.seasonWins}</td>
                  </tr>
                  <tr>
                    <td>Song of the Season Wins</td>
                    <td>{data?.sotnStats.sotsWins}</td>
                  </tr>
                  <tr>
                    <td>Longest Win Streak</td>
                    <td>{data?.sotnStats.streak}</td>
                  </tr>
                  <tr>
                    <td>Most Recent Win</td>
                    <td>{data?.sotnStats.lastWin}</td>
                  </tr>
                  <tr>
                    <td>Longest Gap Between Wins</td>
                    <td>
                      {data?.sotnStats.longestDaysGap}{' '}
                      {data?.sotnStats.longestDaysGap == 1 ? 'day' : 'days'} /{' '}
                      {data?.sotnStats.longestStreamGap}{' '}
                      {data?.sotnStats.longestStreamGap == 1
                        ? 'stream'
                        : 'streams'}
                    </td>
                  </tr>
                  <tr>
                    <td>Shortest Gap Between Wins</td>
                    <td>
                      {data?.sotnStats.shortestDaysGap}{' '}
                      {data?.sotnStats.shortestDaysGap == 1 ? 'day' : 'days'} /{' '}
                      {data?.sotnStats.shortestStreamGap}{' '}
                      {data?.sotnStats.shortestStreamGap == 1
                        ? 'stream'
                        : 'streams'}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <hr />
            <div className='mb-3'>
              <h2>Winning Songs by Season</h2>
            </div>
            <div className='container d-xl-none d-xl-block mb-5 mt-5  aligns-items-center justify-content-center'>
              <div className='container mb-5 mt-5 aligns-items-center justify-content-center'>
                {data?.sotnStats.winningSongs.map(
                  (songsBySeason: SeasonSongs, index: number) => (
                    <Accordion defaultActiveKey='0' key={index}>
                      <Accordion.Item
                        eventKey={new Number(index).toString()}
                        key={index}
                      >
                        <Accordion.Header>
                          Season {songsBySeason.season}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table>
                            <thead>
                              <tr>
                                <td>Song Title</td>
                                <td>Stream Date</td>
                              </tr>
                            </thead>
                            <tbody>
                              {songsBySeason.songs.map(
                                (song: SotnWinner, songIndex: number) => (
                                  <tr key={songIndex}>
                                    <td>
                                      <a
                                        href={`https://youtu.be/${song.youtubeId}`}
                                        target='_blank'
                                        rel='noreferrer'
                                      >
                                        {song.title}
                                      </a>
                                    </td>
                                    <td>{song.streamDate}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )
                )}
              </div>
            </div>
            <div className='d-none d-xl-block'>
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
                  {data?.sotnStats.winningSongs.map(
                    (songsBySeason: SeasonSongs, index: number) => (
                      <div className='pb-3' key={index}>
                        <Row
                          className={`${styles.winnersheading} roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight`}
                        >
                          <Col className='subheading'>
                            Season {songsBySeason.season}
                          </Col>
                        </Row>

                        {songsBySeason.songs.map(
                          (song: SotnWinner, index: number) => (
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
                                  {getArtistValue(
                                    song.artist,
                                    song.featuredArtist
                                  )}
                                </Col>
                                <Col>{song.year}</Col>
                                <Col>{getDate(song.streamDate)}</Col>
                              </Row>
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </Container>
              </div>
            </div>
            <div className='mb-2'>
              <Link href='../users'>&lt;&lt; Back to users</Link>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default SotnUserStats;

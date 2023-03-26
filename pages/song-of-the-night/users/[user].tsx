import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Accordion, Col, Container, Row, Table } from 'react-bootstrap';
import { SotnStats, SotnWinner } from '../../../@types';
import styles from '../sotn.module.css';
import sotnData from '../../../data/sotn-user-response.json';
import {
  getArtistValue,
  getDate,
  getDateDiff
} from '../../../utils/sotn-utils';

type SotnUserStats = {
  stats: SotnStats;
  wins: SeasonSongs[];
};

type SeasonSongs = {
  season: number;
  songs: SotnWinner[];
};

export async function getServerSideProps(context: { query: { user: any } }) {
  const { user } = context.query;
  const data = JSON.parse(JSON.stringify(sotnData));

  data.winners.sort(
    (winner1: any, winner2: any) =>
      new Date(winner1.playDate).getTime() -
      new Date(winner2.playDate).getTime()
  );

  let userStats = {
    user: user,
    wins: 1,
    lastWinDate: '',
    streamGap: {
      current: 0,
      longest: 0,
      shortest: 0
    },
    daysGap: {
      current: 0,
      longest: 0,
      shortest: 0
    },
    streak: 0,
    lastStreamWinNumber: 0
  };

  let songsBySeason = new Map<number, SotnWinner[]>();

  data.winners.forEach((winner: SotnWinner, streamNumber: number) => {
    if (songsBySeason.has(winner.season)) {
      songsBySeason.get(winner.season)?.push(winner);
    } else {
      songsBySeason.set(winner.season, [winner]);
    }

    const requester = winner.requester.toLowerCase();

    let winStreakUser;

    userStats!.wins++;

    // Determine Gaps (in Days)
    const gapDays = getDateDiff(
      new Date(userStats!.lastWinDate!),
      new Date(winner.playDate)
    );

    userStats!.daysGap.longest =
      userStats!.daysGap.longest === 0
        ? gapDays
        : Math.max(userStats!.daysGap.longest, gapDays);

    userStats!.daysGap.shortest =
      userStats!.daysGap.shortest === 0
        ? gapDays
        : Math.min(userStats!.daysGap.shortest, gapDays);

    userStats!.daysGap.current = getDateDiff(
      new Date(userStats!.lastWinDate!),
      new Date()
    );

    // Determine Gaps (in Streams)
    const streamsGap = streamNumber + 1 - userStats!.lastStreamWinNumber;
    userStats!.streamGap.longest =
      userStats!.streamGap.longest === 0
        ? streamsGap
        : Math.max(userStats!.streamGap.longest, streamsGap);

    userStats!.streamGap.shortest =
      userStats!.streamGap.shortest === 0
        ? streamsGap
        : Math.min(userStats!.streamGap.shortest, streamsGap);

    if (userStats!.lastStreamWinNumber - streamNumber !== 0) {
      userStats!.streamGap.current++;
    }

    userStats!.lastWinDate = winner.playDate;

    if (winStreakUser === requester) {
      userStats!.streak++;
    }
  });

  let songs: SeasonSongs[] = [];

  songsBySeason.forEach((seasonSongs, key) => {
    songs.push({
      season: key,
      songs: seasonSongs
    });
  });

  return {
    props: {
      stats: userStats,
      wins: songs
    }
  };
}

const SotnUserStats: NextPage<SotnUserStats> = ({ stats, wins }) => {
  return (
    <>
      <main>
        <h1>{stats.user}</h1>
        <h2>User Summary</h2>
        <hr />
        <div className='container d-flex aligns-items-center justify-content-center mb-3'>
          <Table>
            <tbody>
              <tr>
                <td>Song of the Night Wins</td>
                <td>{stats.wins}</td>
              </tr>
              <tr>
                <td>Season Championship Wins</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Song of the Season Wins</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Longest Win Streak</td>
                <td>{stats.streak}</td>
              </tr>
              <tr>
                <td>Most Recent Win</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Longest Gap Between Wins</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Shortest Gap Between Wins</td>
                <td>-</td>
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
            {wins.map((songsBySeason: SeasonSongs, index: number) => (
              <Accordion defaultActiveKey='0'>
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
                            <tr>
                              <td>{song.title}</td>
                              <td>{song.playDate}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
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
              {wins.map((songsBySeason: SeasonSongs, index: number) => (
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
                          <a
                            href={`https://youtu.be/${song.youtubeId}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {song.title}
                          </a>
                          <Col xs={4}>
                            {getArtistValue(song.artist, song.featuredArtist)}
                          </Col>
                          <Col>{song.year}</Col>
                          <Col>{getDate(song.playDate)}</Col>
                        </Row>
                      </div>
                    )
                  )}
                </div>
              ))}
            </Container>
          </div>
        </div>
        <div className='mb-2'>
          <Link href='../users'>&lt;&lt; Back to users</Link>
        </div>
      </main>
    </>
  );
};

export default SotnUserStats;

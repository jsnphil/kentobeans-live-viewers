import { NextPage } from 'next';
import Link from 'next/link';
import { Accordion, Col, Container, Row, Table } from 'react-bootstrap';
import { SotnStats, SotnWinner } from '../../@types';
import { getDate, getDateDiff } from '../../utils/sotn-utils';
import styles from './sotn.module.css';
import { useKentobot } from '../../utils/kentobotApi';
import LoadingSpinner from '../../components/LoadingSpinner';

function processSotnData(winnerData: SotnWinner[]) {
  let winnersMap = new Map<string, SotnStats>();

  winnerData.sort(
    (winner1: any, winner2: any) =>
      new Date(winner1.playDate).getTime() -
      new Date(winner2.playDate).getTime()
  );

  winnerData.forEach((winner: SotnWinner, streamNumber: number) => {
    const requester = winner.requester.toLowerCase();

    let winStreakUser;
    if (winnersMap.has(requester)) {
      const user = winnersMap.get(requester);

      user!.wins++;

      // Determine Gaps (in Days)
      const gapDays = getDateDiff(
        new Date(user!.lastWinDate!),
        new Date(winner.streamDate)
      );

      user!.daysGap.longest =
        user!.daysGap.longest === 0
          ? gapDays
          : Math.max(user!.daysGap.longest, gapDays);

      user!.daysGap.shortest =
        user!.daysGap.shortest === 0
          ? gapDays
          : Math.min(user!.daysGap.shortest, gapDays);

      user!.daysGap.current = getDateDiff(
        new Date(user!.lastWinDate!),
        new Date()
      );

      // Determine Gaps (in Streams)
      const streamsGap = streamNumber + 1 - user!.lastStreamWinNumber;
      user!.streamGap.longest =
        user!.streamGap.longest === 0
          ? streamsGap
          : Math.max(user!.streamGap.longest, streamsGap);

      user!.streamGap.shortest =
        user!.streamGap.shortest === 0
          ? streamsGap
          : Math.min(user!.streamGap.shortest, streamsGap);

      if (user!.lastStreamWinNumber - streamNumber !== 0) {
        user!.streamGap.current++;
      }

      user!.lastWinDate = winner.streamDate;

      if (winStreakUser === requester) {
        user!.streak++;
      }
    } else {
      winnersMap.set(requester, {
        user: requester,
        wins: 1,
        lastWinDate: winner.streamDate,
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
        lastStreamWinNumber: streamNumber + 1
      });
    }
  });

  let users: SotnStats[] = [];
  winnersMap.forEach((winner) => {
    users.push(winner);
  });

  users.sort((user1, user2) => user2.wins - user1.wins);

  return users;
}

const SongOfTheNightUsers: NextPage = () => {
  const { data, error, isLoading } = useKentobot(
    `/song-of-the-night/winning-requests`
  );

  let sotnData: SotnStats[] = [];
  if (data && !isLoading) {
    sotnData = processSotnData(data?.winners);
  }

  return (
    <>
      <main>
        {!data || isLoading ? (
          <LoadingSpinner message='Loading Song of the Night Data' />
        ) : (
          <>
            <div className='container d-xl-none d-xl-block mt-5  aligns-items-center justify-content-center'>
              <div className='container mb-5 mt-5 aligns-items-center justify-content-center'>
                {sotnData?.map((winner: SotnStats, index: number) => (
                  <>
                    <Accordion defaultActiveKey='0'>
                      {sotnData?.map((winner: SotnStats, index: number) => (
                        <Accordion.Item
                          eventKey={new Number(index).toString()}
                          key={index}
                        >
                          <Accordion.Header>
                            {winner.user} - {winner.wins}{' '}
                            {winner.wins == 1 ? 'win' : 'wins'}
                          </Accordion.Header>
                          <Accordion.Body>
                            <Table>
                              <tbody>
                                <tr>
                                  <td>Song of the Night Wins</td>
                                  <td>{winner.wins}</td>
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
                                  <td>Most Recent Win</td>
                                  <td>-</td>
                                </tr>
                              </tbody>
                            </Table>
                            <Container>
                              <Row>
                                <Col className='text-center'>
                                  <Link
                                    href={`/song-of-the-night/users/${winner.user}`}
                                  >
                                    More Stats
                                  </Link>
                                </Col>
                              </Row>
                            </Container>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </>
                ))}
              </div>
            </div>
            <div className='d-none d-xl-block'>
              <div className={`${styles.sotnTable}`}>
                <div className='container d-flex aligns-items-center justify-content-center'>
                  <Container>
                    <Row>
                      <Col
                        className={`${styles.winnersheading} roundedTopLeft text-center`}
                        xs={{ span: 3, offset: 6 }}
                      >
                        Gap (Days)
                      </Col>
                      <Col
                        className={`${styles.winnersheading} roundedTopRight text-center`}
                        xs={3}
                      >
                        Gap (Streams)
                      </Col>
                    </Row>
                    <Row className='roundedTopLeft'>
                      <Col
                        className={`${styles.winnersheading} roundedTopLeft roundedBottomLeft`}
                        xs={4}
                      >
                        User
                      </Col>
                      <Col className={`${styles.winnersheading}`} xs={1}>
                        Wins
                      </Col>
                      <Col className={`${styles.winnersheading}`} xs={1}>
                        Streak
                      </Col>
                      <Col className={`${styles.winnersheading}`} xs={1}>
                        Largest
                      </Col>
                      <Col className={`${styles.winnersheading}`} xs={1}>
                        Smallest
                      </Col>
                      <Col className={`${styles.winnersheading}`} xs={1}>
                        Current
                      </Col>
                      <Col className={`${styles.winnersheading}`} xs={1}>
                        Largest
                      </Col>
                      <Col className={`${styles.winnersheading}`} xs={1}>
                        Smallest
                      </Col>
                      <Col
                        className={`${styles.winnersheading} roundedBottomRight`}
                        xs={1}
                      >
                        Current
                      </Col>
                    </Row>
                    {sotnData?.map((winner: SotnStats, index: number) => (
                      <Link
                        href={`/song-of-the-night/users/${winner.user}`}
                        key={index}
                      >
                        <Row className={`${styles.winnerRow}`} key={index}>
                          <Col xs={4}>{winner.user}</Col>
                          <Col xs={1}>{winner.wins}</Col>
                          <Col xs={1}>{winner.streak}</Col>
                          <Col xs={1}>
                            {winner.daysGap.longest === 0
                              ? '-'
                              : winner.daysGap.longest}
                          </Col>
                          <Col xs={1}>
                            {winner.daysGap.shortest === 0
                              ? '-'
                              : winner.daysGap.shortest}
                          </Col>
                          <Col xs={1}>
                            {winner.daysGap.current
                              ? '0'
                              : winner.daysGap.current}
                          </Col>
                          <Col xs={1}>
                            {winner.streamGap.longest === 0
                              ? '-'
                              : winner.streamGap.longest}
                          </Col>
                          <Col xs={1}>
                            {winner.streamGap.shortest === 0
                              ? '-'
                              : winner.streamGap.longest}
                          </Col>
                          <Col xs={1}>
                            {winner.streamGap.current === 0
                              ? '-'
                              : winner.streamGap.current}
                          </Col>
                        </Row>
                      </Link>
                    ))}
                  </Container>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default SongOfTheNightUsers;

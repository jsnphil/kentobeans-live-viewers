import { NextPage } from 'next';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import { SotnStats, SotnWinner } from '../../@types';
import sotnData from '../../data/sotn-response.json';
import { getDateDiff } from '../../utils/sotn-utils';
import styles from './sotn.module.css';

type SotnProps = {
  winners: SotnStats[];
};

const kentobotApiHost = process.env.NEXT_PUBLIC_KENTOBOT_API_HOST;

export async function getServerSideProps() {
  // TODO extract this into a function(s) that can be called from the state changes as well?

  const res = await fetch(
    `https://${kentobotApiHost}/dev/song-of-the-night/winners`
  );
  // const data = await res.json();
  const data = JSON.parse(JSON.stringify(sotnData));

  let winnersMap = new Map<string, SotnStats>();

  data.winners.sort(
    (winner1: any, winner2: any) =>
      new Date(winner1.playDate).getTime() -
      new Date(winner2.playDate).getTime()
  );

  data.winners.forEach((winner: SotnWinner, streamNumber: number) => {
    const requester = winner.requester.toLowerCase();

    let winStreakUser;
    if (winnersMap.has(requester)) {
      const user = winnersMap.get(requester);

      user!.wins++;

      // Determine Gaps (in Days)
      const gapDays = getDateDiff(
        new Date(user!.lastWinDate!),
        new Date(winner.playDate)
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

      user!.lastWinDate = winner.playDate;

      if (winStreakUser === requester) {
        user!.streak++;
      }
    } else {
      winnersMap.set(requester, {
        user: requester,
        wins: 1,
        lastWinDate: winner.playDate,
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

  return {
    props: {
      winners: users
    }
  };
}

const SongOfTheNightUsers: NextPage<SotnProps> = ({ winners }) => {
  return (
    <>
      <main>
        <div className='container d-xl-none d-xl-block mb-5 mt-5  aligns-items-center justify-content-center'>
          <div className='container mb-5 mt-5 aligns-items-center justify-content-center'>
            Small screen view
          </div>
        </div>
        <div className='d-none d-xl-block mb-5'>
          <div className={`${styles.sotnTable}`}>
            <div className='container d-flex aligns-items-center justify-content-center mb-5'>
              <Container>
                <Row>
                  <Col
                    className={`${styles.winnersheading} ${styles.roundedTopLeft} text-center`}
                    xs={{ span: 3, offset: 6 }}
                  >
                    Gap (Days)
                  </Col>
                  <Col
                    className={`${styles.winnersheading} ${styles.roundedTopRight} text-center`}
                    xs={3}
                  >
                    Gap (Streams)
                  </Col>
                </Row>
                <Row className={`${styles.roundedTopLeft}`}>
                  <Col
                    className={`${styles.winnersheading} ${styles.roundedTopLeft} ${styles.roundedBottomLeft}`}
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
                    className={`${styles.winnersheading} ${styles.roundedBottomRight}`}
                    xs={1}
                  >
                    Current
                  </Col>
                </Row>
                {winners.map((winner: SotnStats, index: number) => (
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
                        {winner.daysGap.current ? '0' : winner.daysGap.current}
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
      </main>
    </>
  );
};

export default SongOfTheNightUsers;

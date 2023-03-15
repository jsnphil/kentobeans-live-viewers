import { NextPage } from 'next';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import sotnData from '../../data/sotn-response.json';
import styles from './sotn.module.css';

type SotnProps = {
  winners: SotnStats[];
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

type SotnStats = {
  user: string;
  wins: number;
  streak: number;
  streamGap: WinGap;
  daysGap: WinGap;
  lastWinDate: string;
  lastStreamWinNumber: number;
};

// TODO Go back to strings, replace with '-' in the UI code below
type WinGap = {
  longest: number;
  shortest: number;
  current: number;
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

      console.log(JSON.stringify(user, null, 2));

      user!.wins++;

      // Determine Gaps (in Days)
      const gapDays =
        user!.lastWinDate === undefined
          ? 0
          : getDateDiff(
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

const getDateDiff = (date1: Date, date2: Date) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const SongOfTheNightUsers: NextPage<SotnProps> = ({ winners }) => {
  console.log(JSON.stringify(winners, null, 2));
  return (
    <>
      <main>
        <div className='container d-xl-none d-xl-block mb-5 mt-5  aligns-items-center justify-content-center'>
          <div className='container mb-5 mt-5 aligns-items-center justify-content-center'>
            Small screen view
          </div>
        </div>
        <div className='d-none d-xl-block mb-5'>
          <div className='container d-flex aligns-items-center justify-content-center mb-5'>
            <Container>
              <Row>
                <Col
                  className={`${styles.winnersheading} ${styles.heading}`}
                  xs={{ span: 3, offset: 6 }}
                >
                  Gap (Days)
                </Col>
                <Col
                  className={`${styles.winnersheading} ${styles.heading}`}
                  xs={3}
                >
                  Gap (Streams)
                </Col>
              </Row>
              <Row className={`${styles.winnersheading} ${styles.heading}`}>
                <Col xs={4}>User</Col>
                <Col xs={1}>Wins</Col>
                <Col xs={1}>Streak</Col>
                <Col xs={1}>Largest</Col>
                <Col xs={1}>Smallest</Col>
                <Col xs={1}>Current</Col>
                <Col xs={1}>Largest</Col>
                <Col xs={1}>Smallest</Col>
                <Col xs={1}>Current</Col>
              </Row>
              {winners.map((winner: SotnStats, index: number) => (
                <Link href={`/song-of-the-night/users/${winner.user}`}>
                  <Row className={`${styles.winnerRow}`} key={index}>
                    <Col xs={4}>{winner.user}</Col>
                    <Col xs={1}>{winner.wins}</Col>
                    <Col xs={1}>{winner.streak}</Col>
                    <Col xs={1}>{winner.daysGap.longest}</Col>
                    <Col xs={1}>{winner.daysGap.shortest}</Col>
                    <Col xs={1}>{winner.daysGap.current}</Col>
                    <Col xs={1}>{winner.streamGap.longest}</Col>
                    <Col xs={1}>{winner.streamGap.shortest}</Col>
                    <Col xs={1}>{winner.streamGap.current}</Col>
                  </Row>
                </Link>
              ))}
            </Container>
          </div>
        </div>
      </main>
    </>
  );
};

export default SongOfTheNightUsers;

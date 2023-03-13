import { NextPage } from 'next';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './sotn.module.css';

import sotnData from '../../data/sotn-response.json';

type SotnProps = {
  winners: SotnWinner[];
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
  const res = await fetch(
    `https://${kentobotApiHost}/dev/song-of-the-night/winners`
  );
  // const data = await res.json();
  const data = JSON.parse(JSON.stringify(sotnData));

  let sotnWinners: SotnWinnerData[] = [];

  data.winners.sort(
    (song1: SotnWinner, song2: SotnWinner) =>
      new Date(song2.playDate).getTime() - new Date(song1.playDate).getTime()
  );

  return {
    props: {
      winners: data.winners
    }
  };
}

const SongOfTheNightSongs: NextPage<SotnProps> = ({ winners }) => {
  console.log(winners);
  return (
    <>
      <main>
        <div className='d-none d-xl-block mb-5'>
          <h1>Complete Song of the Night History</h1>
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
          {winners.map((song: SotnWinner, index: number) => (
            <div className={`${styles.winnerRow}`} key={index}>
              <Row>
                <Col xs={4}>
                  <a
                    href={`https://youtu.be/${song.youtubeId}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {`${index + 1} - ${song.title}`}
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
        </Container>
      </main>
    </>
  );
};

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

export default SongOfTheNightSongs;

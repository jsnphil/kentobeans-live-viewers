import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import logo from '../public/logo.png';
import { Row } from 'react-bootstrap';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';

const Home: NextPage = () => {
  return (
    <div>
      {/* <main className={styles.main}> */}
      <main>
        <Row>
          <div className='d-flex align-items-center justify-content-center mt-5 mb-5'>
            <Image
              id='kentobeansLogo'
              src={logo}
              alt='Kentobeans Logo'
              width={500}
              height={500}
            />
          </div>

          <div className='text-center pt-2'>
            <p>
              Drum grooves and good vibes! Live on Tuesdays and Thursdays from 6
              to 9pm Central.
            </p>
            <p>Themed streams on Thursdays!</p>
          </div>
        </Row>
      </main>
    </div>
  );
};

export default Home;

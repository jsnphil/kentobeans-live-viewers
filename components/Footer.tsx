import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import {
  faInstagram,
  faTwitch,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  const copyrightYear = new Date().getFullYear();
  console.log(copyrightYear);

  return (
    <>
      <footer className={`text-center bg-dark ${styles.footer} pb-3`}>
        <Container>
          <Row className='mb-3'>
            <Col>&copy; Kentobeans.live {`${copyrightYear}`}</Col>
          </Row>

          <Nav className='justify-content-center' activeKey='/home'>
            <Nav.Item>
              <Nav.Link href='https://twitch.tv/kentobeans7'>
                <FontAwesomeIcon icon={faTwitch} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item href='#'>
              <Nav.Link>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='https://twitter.com/kentobeans'>
                <FontAwesomeIcon icon={faTwitter} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='https://youtube.com/kentobeans'>
                <FontAwesomeIcon icon={faYoutube} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href='https://instagram.com/kentobeans'>
                <FontAwesomeIcon icon={faInstagram} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
        {/* <Container>
          <Row>
            <Col>Kentobeans.live</Col>
          </Row>
          <Row>
            <Col>
              
              &nbsp;
              <FontAwesomeIcon icon={faTwitter} />
              &nbsp;
              <FontAwesomeIcon icon={faInstagram} />
              &nbsp;
              <FontAwesomeIcon icon={faYoutube} />
            </Col>
          </Row>
          <Row>
            <Col>
              Powered by{' '}
              <a
                href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className={styles.logo}>
                  <Image
                    src='/vercel.svg'
                    alt='Vercel Logo'
                    width={72}
                    height={16}
                  />
                </span>
              </a>
            </Col>
          </Row>
        </Container> */}
      </footer>
    </>
  );
}

export default Footer;

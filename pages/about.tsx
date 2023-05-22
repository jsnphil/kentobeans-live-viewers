import { NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import phantombotLogo from '../public/phantombot_logo.png';
import digitalOceanLogo from '../public/DigitalOcean_logo.png';
import nextJsLogo from '../public/nextjs-logotype-light-background.svg';
import vercelLogo from '../public/vercel.svg';
import Image from 'next/image';

const About: NextPage = () => {
  return (
    <>
      <main>
        <div className='d-xl-block mb-3 text-center'>
          <Container>
            <div className=' pb-3 text-center'>
              <p className='h1'>Kentobeans7</p>
              Kentobeans7 is a music streamer and drummer from Nashville, TN.
              <p className='h2 pt-3'>Equipment</p>
              <Row className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight'>
                <Col>Drums</Col>
                <Col>Streaming</Col>
              </Row>
              <Row>
                <Col>Gretsch Renown Maple drum set (10", 12", 14", 22")</Col>
                <Col>Focusrite Clarett 8Pre</Col>
              </Row>
              <Row>
                <Col>
                  DW Collector's Series Black Nickel over Brass 6.5"x14" snare
                  drum
                </Col>
                <Col>Sony a6000</Col>
              </Row>
              <Row>
                <Col>Zildjian K Custom Hybrid 14.25" hi-hats</Col>
                <Col>Logitech C920</Col>
              </Row>
              <Row>
                <Col>Zildjian K Custom Hybrid 17" crash cymbal</Col>
                <Col>GVM 48" camera slider</Col>
              </Row>
              <Row>
                <Col>Zildjian K Custom Hybrid 21" ride cymbal</Col>
                <Col />
              </Row>
              <Row>
                <Col>Zildjian K Custom Hybrid 21" ride cymbal</Col>
                <Col />
              </Row>
              <Row>
                <Col>Sabian AA 18" medium crash cymbal</Col>
                <Col />
              </Row>
              <hr />
              <p className='h1'>Kentobot/Kentobean.live</p>
              Kentobot and Kentobeans.live is a custom-built, song request
              Twitch chat bot and stream portal
              <p className='h2 pt-3'>Powered by</p>
              <Row className='py-2 px-2 roundedTopLeft  roundedTopRight'>
                <Col>
                  <a href='https://aws.amazon.com/what-is-cloud-computing'>
                    <img
                      src='https://d0.awsstatic.com/logos/powered-by-aws.png'
                      alt='Powered by AWS Cloud Computing'
                    />
                  </a>
                </Col>
                <Col>
                  <Image
                    id='phantombotLogo'
                    src={phantombotLogo}
                    alt='Phantombot'
                    width={200}
                    height={50}
                  />
                </Col>
                <Col>
                  <Image
                    id='doLogo'
                    src={digitalOceanLogo}
                    alt='Digital Ocean'
                    width={200}
                    height={50}
                  />
                </Col>
              </Row>
              <Row className='pt-5'>
                <Col>
                  <Image
                    id='nextJs'
                    src={nextJsLogo}
                    alt='NextJs'
                    width={200}
                    height={50}
                  />
                </Col>
                <Col>
                  <Image
                    id='vercel'
                    src={vercelLogo}
                    alt='Vercel'
                    width={200}
                    height={50}
                  />
                </Col>
              </Row>
              <div className='pt-5'>
                <p className='small'>
                  Kentobeans7, Kentobot, and Kentobeans.live is not affiliated
                  with any of brands included on this page, and inclusion of a
                  name and/or logo is not meant to imply or suggest any
                  endorsement or sponsorship
                </p>
              </div>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
};

export default About;

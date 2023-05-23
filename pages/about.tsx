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
        <div className='d-xl-block pb-3 text-center'>
          <div className=' pb-3 text-center'>
            <p className='h1'>Kentobeans7</p>
            Kentobeans7 is a music streamer and drummer from Nashville, TN.
            <p className='h2 pt-3'>Equipment</p>
            <Container>
              <Row className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight'>
                <Col>Drums</Col>
                <Col>Streaming</Col>
              </Row>
              <Row>
                <Col>
                  Gretsch Renown Maple drum set (10&quot;, 12&quot;, 14&quot;,
                  22&quot;)
                </Col>
                <Col>Focusrite Clarett 8Pre</Col>
              </Row>
              <Row>
                <Col>
                  DW Collector&apos;s Series Black Nickel over Brass 6.5&quot; x
                  14&quot; snare drum
                </Col>
                <Col>Sony a6000</Col>
              </Row>
              <Row>
                <Col>Zildjian K Custom Hybrid 14.25&quot; hi-hats</Col>
                <Col>Logitech C920</Col>
              </Row>
              <Row>
                <Col>Zildjian K Custom Hybrid 17&quot; crash cymbal</Col>
                <Col>GVM 48&quot; camera slider</Col>
              </Row>
              <Row>
                <Col>Sabian AA 18&quot; medium crash cymbal</Col>
                <Col>Soundcraft Notepad-8FX</Col>
              </Row>
              <Row>
                <Col>Zildjian K Custom Hybrid 21&quot; ride cymbal</Col>
                <Col>Logitech Brio</Col>
              </Row>
              <Row>
                <Col>Meinl Classics Custom 12&quot; Dark trash stack</Col>
                <Col />
              </Row>
            </Container>
            <hr />
            <p className='h1'>Kentobot/Kentobean.live</p>
            Kentobot and Kentobeans.live is a custom-built, song request Twitch
            chat bot and stream portal
            <p className='h2 pt-3'>Powered by</p>
            <Container>
              <Row className='py-2 px-2 roundedTopLeft roundedTopRight'>
                <Col xs={12} md={4} className='pt-2'>
                  <a
                    href='https://aws.amazon.com/what-is-cloud-computing'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img
                      src='https://d0.awsstatic.com/logos/powered-by-aws.png'
                      alt='Powered by AWS Cloud Computing'
                    />
                  </a>
                </Col>
                <Col xs={12} md={4} className='pt-2'>
                  <a
                    href='https://www.digitalocean.com/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Image
                      id='doLogo'
                      src={digitalOceanLogo}
                      alt='Digital Ocean'
                      width={300}
                      height={50}
                    />
                  </a>
                </Col>
                <Col xs={12} md={4} className='pt-2'>
                  <a
                    href='https://github.com/PhantomBot/PhantomBot'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Image
                      id='phantombotLogo'
                      src={phantombotLogo}
                      alt='Phantombot'
                      width={200}
                      height={50}
                    />
                  </a>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} className='pt-2'>
                  <a
                    href='https://nextjs.org/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Image
                      id='nextJs'
                      src={nextJsLogo}
                      alt='NextJs'
                      width={200}
                      height={50}
                    />
                  </a>
                </Col>
                <Col xs={12} md={6} className='pt-2'>
                  <a
                    href='https://vercel.com/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Image
                      id='vercel'
                      src={vercelLogo}
                      alt='Vercel'
                      width={200}
                      height={50}
                    />
                  </a>
                </Col>
              </Row>
            </Container>
            <div className='pt-5'>
              <p className='small'>
                Kentobeans7, Kentobot, and Kentobeans.live is not affiliated
                with any of brands included on this page, and inclusion of a
                name and/or logo is not meant to imply or suggest any
                endorsement, sponsorship, or involvement, direct or indirect.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;

/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col } from 'react-bootstrap';
import phantombotLogo from '../public/phantombot_logo.png';
import digitalOceanLogo from '../public/DigitalOcean_logo.png';
import nextJsLogo from '../public/nextjs-logotype-light-background.svg';
import vercelLogo from '../public/vercel.svg';
import Image from 'next/image';

export default function PoweredByTechnology() {
  return (
    <div>
      <p className='h1'>Kentobot/Kentobean.live</p>
      Kentobot and Kentobeans.live is a custom-built, song request Twitch chat
      bot and stream portal
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
            <a href='https://nextjs.org/' target='_blank' rel='noreferrer'>
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
            <a href='https://vercel.com/' target='_blank' rel='noreferrer'>
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
    </div>
  );
}

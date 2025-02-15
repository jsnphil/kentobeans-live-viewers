import { Row } from 'react-bootstrap';
import Image from 'next/image';
import logo from '../public/logo.png';

export default function HomePage() {
  return (
    <div>
      <Row>
        <div className='d-flex align-items-center justify-content-center mt-5 mb-5'>
          <Image
            id='kentobeansLogo'
            src={logo}
            alt='Kentobeans Logo'
            width={400}
            height={400}
            priority={true}
          />
        </div>

        <div className='text-center pt-2'>
          <p>
            Drum grooves and good vibes! Live on Thursdays from 6 to 9pm
            Central.
          </p>
        </div>
      </Row>
    </div>
  );
}

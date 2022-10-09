import { Alert } from 'react-bootstrap';
import Footer from './Footer';
import Navbar from './Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <div className='d-flex pt-2 align-items-center justify-content-center'>
        <Alert key='warning' variant='warning'>
          <FontAwesomeIcon icon={faWarning} /> &nbsp; This site is still a work
          in progress. Not all features may be available, and some issues should
          be expected
        </Alert>
      </div>
      <main>{children}</main>
    </>
  );
}

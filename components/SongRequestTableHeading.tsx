import { Row, Col } from 'react-bootstrap';
import styles from '../styles/songlist.module.css';

export interface SongRequestTableHeadingProps {}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
const SongRequestTableHeading = (props: SongRequestTableHeadingProps) => {
  return (
    <>
      <div className='d-none d-xl-block'>
        <Row
          className={`${styles.songlistHeading} roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight`}
        >
          <Col md={9}>Song Title</Col>
          <Col md={2}>Requested by</Col>
          <Col md={1}>Length</Col>
        </Row>
      </div>
    </>
  );
};

export default SongRequestTableHeading;

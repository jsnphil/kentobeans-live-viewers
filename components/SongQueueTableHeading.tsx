import { Col } from 'react-bootstrap';

export default function SongQueueTableHeading({
  children
}: SongQueueTableHeadingProps) {
  return (
    <Col className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight text-center'>
      {children}
    </Col>
  );
}

interface SongQueueTableHeadingProps {
  children: React.ReactNode;
}

import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTicket, faDice } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { SongRequest } from '../libs/types';
import { secondsToMinutes } from '../libs/common';
import SongQueueTableHeading from './SongQueueTableHeading';

interface SongRequestProps {
  requests: SongRequest[];
  showIndex: boolean;
  showRemoveButton: boolean;
}

const SongRequestTable = (props: SongRequestProps) => {
  // const session = useSession();

  const requestRows = props.requests.map((request, index) => (
    <>
      <a
        href={'https://youtu.be/' + request.youtubeId}
        target='_blank'
        rel='noreferrer'
      >
        <Row key={request.youtubeId} className='songTableRow'>
          <Col md={9}>
            {(props.showIndex || request.isBumped) && ++index + ` - `}
            <span>&nbsp;</span>
            {request.isBumped && (
              <>
                <FontAwesomeIcon icon={faStar} />
                <span>&nbsp;</span>
              </>
            )}
            {request.isShuffled && (
              <>
                <FontAwesomeIcon icon={faDice} />
                <span>&nbsp;</span>
              </>
            )}
            {request.isShuffleEntered && (
              <>
                <FontAwesomeIcon icon={faTicket} />
                <span>&nbsp;</span>
              </>
            )}

            {request.title}
          </Col>

          <Col md={2}>
            <span className='d-inline d-sm-none'>
              <i>Requested By:</i> {request.requestedBy}
            </span>
            <span className='d-none d-sm-inline'>{request.requestedBy}</span>
          </Col>
          <Col className='d-none d-sm-inline' md={1}>
            {secondsToMinutes(request.length)}
          </Col>
          <Col className='d-block d-sm-none'>
            <hr />
          </Col>
        </Row>
      </a>
    </>
  ));

  return (
    <>
      <Row>
        <SongQueueTableHeading>Request Queue</SongQueueTableHeading>
      </Row>
      {requestRows}
    </>
  );
};

export default SongRequestTable;

function isLoggedInUserRequest(
  requester: string,
  sessionUser: string | null | undefined
) {
  return sessionUser && requester.toLowerCase() === sessionUser.toLowerCase();
}

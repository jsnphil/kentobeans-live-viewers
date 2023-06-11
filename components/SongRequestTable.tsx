import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTicket, faDice } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';

export interface SongListItem {
  song: string;
  title: string;
  duration: string;
  requester: string;
  bump: boolean | string;
  shuffle: boolean | string;
  shuffleEntered: boolean | string;
}

interface SongRequestProps {
  requests: SongListItem[];
  showIndex: boolean;
  showRemoveButton: boolean;
}

const SongRequestTable = (props: SongRequestProps) => {
  const session = useSession();
  const requestRows = props.requests.map((request, index) => (
    <>
      <a
        href={'https://youtu.be/' + request.song}
        target='_blank'
        rel='noreferrer'
      >
        <Row key={request.song} className='songTableRow'>
          <Col md={9}>
            {(props.showIndex || request.bump === 'true') && ++index + ` - `}
            <span>&nbsp;</span>
            {request.bump === 'true' && (
              <>
                <FontAwesomeIcon icon={faStar} />
                <span>&nbsp;</span>
              </>
            )}
            {request.shuffle === 'true' && (
              <>
                <FontAwesomeIcon icon={faDice} />
                <span>&nbsp;</span>
              </>
            )}
            {request.shuffleEntered === 'true' && (
              <>
                <FontAwesomeIcon icon={faTicket} />
                <span>&nbsp;</span>
              </>
            )}

            {request.title}
          </Col>

          <Col md={2}>
            <span className='d-inline d-sm-none'>
              <i>Requested By:</i> {request.requester}
            </span>
            <span className='d-none d-sm-inline'>{request.requester}</span>
          </Col>
          <Col className='d-none d-sm-inline' md={1}>
            {request.duration}
          </Col>
          <Col className='d-block d-sm-none'>
            <hr />
          </Col>
        </Row>
      </a>
    </>
  ));

  return <>{requestRows}</>;
};

export default SongRequestTable;

function isLoggedInUserRequest(
  requester: string,
  sessionUser: string | null | undefined
) {
  return sessionUser && requester.toLowerCase() === sessionUser.toLowerCase();
}

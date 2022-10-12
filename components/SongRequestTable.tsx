import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faTicket,
  faDice,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';

export interface SongRequest {
  song: string;
  title: string;
  duration: string;
  requester: string;
  bump: boolean | string;
  shuffle: boolean | string;
  shuffleEntered: boolean | string;
}

interface SongRequestProps {
  requests: SongRequest[];
  showIndex: boolean;
  showRemoveButton: boolean;
}

const SongRequestTable = (props: SongRequestProps) => {
  const session = useSession();
  const requestRows = props.requests.map((request, index) => (
    <>
      <tr
        className={
          isLoggedInUserRequest(request.requester, session.data?.user?.name)
            ? 'songTableHighlight'
            : ''
        }
        key={request.song}
      >
        <td>{(props.showIndex || request.bump === 'true') && ++index}</td>
        <td>
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
          <a
            href={'https://youtu.be/' + request.song}
            target='_blank'
            rel='noreferrer'
          >
            {request.title}
          </a>
        </td>
        <td>{request.requester}</td>
        <td>{request.duration}</td>
        {isLoggedInUserRequest(request.requester, session.data?.user?.name) &&
          props.showRemoveButton && (
            <td>
              <Button variant='danger' size='sm'>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
          )}
      </tr>
    </>
  ));

  return (
    <>
      <Table className='songRequestTable' borderless hover size='sm'>
        <tbody>{requestRows}</tbody>
      </Table>
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

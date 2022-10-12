import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTicket, faDice } from '@fortawesome/free-solid-svg-icons';

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
}

const SongRequestTable = (props: SongRequestProps) => {
  const flag = false;
  const requestRows = props.requests.map((request, index) => (
    <>
      <tr className='songRequestTable' key={request.song}>
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
          <a href={'https://youtu.be/' + request.song} target='_blank'>
            {request.title}
          </a>
        </td>
        <td>{request.requester}</td>
        <td>{request.duration}</td>
        {flag && <td>Remove Button</td>}
      </tr>
    </>
  ));

  return (
    <>
      <Table borderless hover size='sm'>
        <tbody>{requestRows}</tbody>
      </Table>
    </>
  );
};

export default SongRequestTable;

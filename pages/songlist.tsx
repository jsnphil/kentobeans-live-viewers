import {
  faDice,
  faStar,
  faTicket,
  faCircleInfo
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { NextPage } from 'next';
import { useState, useEffect, useCallback } from 'react';
import { Button, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import useWebSocket, { ReadyState, Options } from 'react-use-websocket';
import LoadingSpinner from '../components/LoadingSpinner';
import SongRequestTable, { SongListItem } from '../components/SongRequestTable';
import styles from '../styles/songlist.module.css';
import RequestRules from './request-rules';
import RequestRulesModal from '../components/RequestRulesModal';

interface QueueInfo {
  status: 'Closed|Open';
  mode: string;
  totalSongs: number;
  playedSongs: number;
  totalTime: string;
  channelPointsBumpsLeft: number;
  beanBumpsLeft: number;
}

const emptySongList: SongListItem[] = [];

const StreamSongList: NextPage = () => {
  const [queueStatus, setQueueStatus] = useState('Closed');
  const [playedSongs, setPlayedSongs] = useState(0);
  const [remainingChannelPointBumps, setRemainingChannelPointBumps] =
    useState(0);
  const [remainingBeanBumps, setRemainingBeanBumps] = useState(0);

  const [songList, setSongList] = useState<SongListItem[]>([]);
  const [songHistory, setSongHistory] = useState<SongListItem[]>([]);
  const [currentSong, setCurrentSong] = useState<SongListItem>();
  const [contenders, setContenders] = useState<SongListItem[]>([]);

  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    'wss://kentobeans.live/ws/ytplayer'
  );

  const { sendMessage, lastMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl, {
      onOpen: () =>
        sendMessage(
          JSON.stringify({
            readauth: 'xy3gUrovotadazBoRmRq6zIgQyUk8G' // Move to getStaticProps()
          })
        ),
      shouldReconnect: (closeEvent) => true
    });

  const refreshData = (data: string) => {
    sendMessage(
      JSON.stringify({
        query: data
      })
    );
  };

  useEffect(() => {
    const websocketMessage = JSON.parse(JSON.stringify(lastJsonMessage));
    if (lastMessage !== null) {
      const msg = JSON.parse(lastMessage.data);
      if (websocketMessage.ping) {
        sendMessage(
          JSON.stringify({
            pong: 'pong'
          })
        );
      }

      if (websocketMessage.authresult === 'true') {
        refreshData('currentsong');
        refreshData('songlist');
        refreshData('playlist');
        refreshData('songrequesthistory');
      }

      if (websocketMessage.queueStatus) {
        const queueStatus = websocketMessage.queueStatus as QueueInfo;

        setQueueStatus(queueStatus.status);
        setPlayedSongs(queueStatus.playedSongs); // Can this be set from the song history list length
        setRemainingChannelPointBumps(queueStatus.channelPointsBumpsLeft);
        setRemainingBeanBumps(queueStatus.beanBumpsLeft);
      }

      if (websocketMessage.songlist) {
        setSongList(websocketMessage.songlist);
      }

      if (websocketMessage.requestHistory) {
        setSongHistory(websocketMessage.requestHistory);
      }

      if (websocketMessage.currentsong) {
        setCurrentSong(websocketMessage.currentsong);
      }

      if (websocketMessage.playlist) {
        setContenders(websocketMessage.playlist);
      }
    }
  }, [lastJsonMessage, lastMessage, sendMessage, refreshData]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
  }[readyState];

  const songlistLoaded = connectionStatus === 'Open' && songList;

  return (
    <>
      <RequestRulesModal />
      <div>
        <Container>
          <div className={`${styles.songlistSummary} pb-3 text-center`}>
            <Row
              className={`${styles.songlistSummaryHeading} py-2 px-2 roundedTopLeft  roundedTopRight `}
            >
              <Col>Queue Status</Col>
              <Col>Songs Played</Col>
              <Col>Bean Bumps</Col>
              <Col>Point Bumps</Col>
            </Row>
            <Row
              className={`${styles.songlistSummaryData} py-2 px-2 fs-6 roundedBottomLeft roundedBottomRight`}
            >
              <Col>{queueStatus}</Col>
              <Col>{playedSongs}</Col>
              <Col>{remainingBeanBumps}</Col>
              <Col>{remainingChannelPointBumps}</Col>
            </Row>
          </div>
        </Container>
        <div id='nowPlaying' className='mb-3'>
          <Container>
            <Row>
              <Col
                className={`subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight text-center`}
              >
                Now Playing
              </Col>
            </Row>
            <Row>
              {currentSong ? (
                <>
                  <Col>
                    <a
                      href={`https://youtu.be/${currentSong.song}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {currentSong.title}
                    </a>
                  </Col>
                  <Col>{currentSong.requester}</Col>
                  <Col>{currentSong.duration}</Col>
                </>
              ) : (
                <Col>Nothing playing</Col>
              )}
            </Row>
          </Container>
        </div>

        <div id='songQueue' className='mb-3'>
          <Container>
            <Row>
              <Col
                className={`subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight text-center`}
              >
                Request Queue
              </Col>
            </Row>
            <Row>{/* <Col>Requests go here</Col> */}</Row>
            <div className='mt-3 text-center'>
              <Row>
                <Col>
                  <FontAwesomeIcon icon={faStar} /> Bumped Request
                </Col>
                <Col>
                  <FontAwesomeIcon icon={faDice} /> Shuffle Winner
                </Col>
                <Col>
                  <FontAwesomeIcon icon={faTicket} /> Shuffle Entrant
                </Col>
              </Row>
              <Row className='pt-2'>
                <Col>
                  <FontAwesomeIcon icon={faCircleInfo} /> View Request Rules
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <div id='sotnContenders' className='mb-3'>
          <Container>
            <Row>
              <Col
                className={`subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight text-center`}
              >
                Song of the Night Contenders
              </Col>
            </Row>
            <Row>{/* <Col>Requests go here</Col> */}</Row>
          </Container>
        </div>

        <div id='playedRequests' className='mb-3'>
          <Container>
            <Row>
              <Col
                className={`subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight text-center`}
              >
                Played Requests
              </Col>
            </Row>
            <Row>{/* <Col>Requests go here</Col> */}</Row>
          </Container>
        </div>
      </div>

      {/* <hr />
      <p>OLD CODE</p>
      <Table bordered>
        <thead>
          <tr className='songlistSummaryHeading'>
            <th className='roundTL'>Status</th>
            <th>Total Songs Played</th>
            <th>Points Bumps Remaining</th>
            <th className='roundTR'>Bean Bumps Remaining</th>
          </tr>
        </thead>
        <tbody>
          <tr className='songlistSummaryData'>
            <td className='roundBL'>{queueStatus}</td>
            <td>{playedSongs}</td>
            <td>{remainingChannelPointBumps}</td>
            <td className='roundBR'>{remainingBeanBumps}</td>
          </tr>
        </tbody>
      </Table>

      <div className='queueHeading mb-5'>Now Playing</div>

      {currentSong && (
        <>
          <Table borderless hover size='sm'>
            <tbody>
              <tr className='songRequestTable'>
                <td></td>
                <td>
                  <a
                    href={'https://youtu.be/' + currentSong.song}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {currentSong.title}
                  </a>
                </td>
                <td>{currentSong.requester}</td>
                <td>{currentSong.duration}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}

      <div className='queueHeading'>Requests</div>
      <SongRequestTable
        requests={songList}
        showIndex={false}
        showRemoveButton={false}
      />

      <div>
        <p>
          <FontAwesomeIcon icon={faStar} /> Bumped Request
          <br />
          <FontAwesomeIcon icon={faDice} /> Shuffle Winner
          <br />
          <FontAwesomeIcon icon={faTicket} /> Shuffle Entrant
        </p>
      </div>

      <div className='queueHeading'>Song of the Night Contenders</div>
      <SongRequestTable
        requests={contenders}
        showIndex={false}
        showRemoveButton={false}
      />

      <div className='queueHeading'>Played Requests</div>
      <SongRequestTable
        requests={songHistory}
        showIndex={true}
        showRemoveButton={false}
      /> */}
    </>
  );
};

export default StreamSongList;

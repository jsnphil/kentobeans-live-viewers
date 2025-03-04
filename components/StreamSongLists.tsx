'use client';

import { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { SongRequest } from '../libs/types';
import { StreamInfo } from './StreamInfo';
import { CurrentSong } from './CurrentSong';
import SongRequestTable from './SongRequestTable';
import SongQueueTableHeading from './SongQueueTableHeading';
import { Row } from 'react-bootstrap';
import RequestRulesModal from './RequestRulesModal';

export const StreamSongLists = () => {
  const [songList, setSongList] = useState<SongRequest[]>([]);
  const [currentSong, setCurrentSong] = useState<SongRequest>();

  const [queueStatus, setQueueStatus] = useState('Closed');
  const [playedSongs, setPlayedSongs] = useState(0);
  const [remainingChannelPointBumps, setRemainingChannelPointBumps] =
    useState(0);
  const [remainingBeanBumps, setRemainingBeanBumps] = useState(0);

  const { sendJsonMessage, lastJsonMessage, lastMessage, readyState } =
    useWebSocket('wss://i0qhsp6cw3.execute-api.us-east-1.amazonaws.com/dev', {
      onOpen: () => {
        console.log('connected');
        // TODO Send message to authenticate
        sendJsonMessage({
          action: 'sendmessage',
          message: 'songqueue'
        });
      },
      onClose: () => console.log('closed'),
      onMessage: (event) => {
        // TODO Move this to a separate function/hook
        console.log(event);
        const message = JSON.parse(event.data);
        console.log(message);
        if (message.songData) {
          setCurrentSong(message.songData.currentSong);
          setSongList(message.songData.songQueue);
        }
        if (message.songQueue) {
          setSongList(message.songQueue);
        }
        if (message.currentSong) {
          setCurrentSong(message.songData.currentSong);
        }
        if (message.queueStatus) {
          setQueueStatus(message.queueStatus === 'open' ? 'Open' : 'Closed');
        }
        if (message.bumpData) {
          setRemainingBeanBumps(message.bumpData.beanBumpsAvailable);
          setRemainingChannelPointBumps(
            message.bumpData.channelPointBumpsAvailable
          );
        }
      },
      shouldReconnect: (closeEvent) => true,
      heartbeat: {
        message: (() =>
          JSON.stringify({ action: 'sendmessage', message: 'ping' }))(),
        returnMessage: (() => JSON.stringify({ message: 'pong' }))(),
        interval: 60000
      }
    });

  return (
    <>
      <RequestRulesModal />
      <div id='streamInfo'>
        <StreamInfo
          playedSongs={playedSongs}
          queueStatus={queueStatus}
          remainingBeanBumps={remainingBeanBumps}
          remainingChannelPointBumps={remainingChannelPointBumps}
        />
      </div>
      <div id='nowPlaying' className='mb-3'>
        <CurrentSong currentSong={currentSong} />
      </div>

      <div id='songQueue'>
        {' '}
        <SongRequestTable
          requests={songList}
          showIndex={false}
          showRemoveButton={false}
        />
      </div>

      {/* TODO Put this in its own component */}
      <div id='sotnContenders' className='mt-3'>
        <Row>
          <SongQueueTableHeading>
            Song of the Night Contenders
          </SongQueueTableHeading>
        </Row>
      </div>

      {/* TODO Put this in its own component */}
      <div id='sotnContenders' className='mt-3'>
        <Row>
          <SongQueueTableHeading>Played Requests</SongQueueTableHeading>
        </Row>
      </div>
    </>
  );
};

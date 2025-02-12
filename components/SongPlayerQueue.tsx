'use client';
import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState, Options } from 'react-use-websocket';
import { SongListItem } from './SongRequestTable';
import YouTube, { YouTubeProps } from 'react-youtube';

interface QueueInfo {
  status: 'Closed|Open';
  mode: string;
  totalSongs: number;
  playedSongs: number;
  totalTime: string;
  channelPointsBumpsLeft: number;
  beanBumpsLeft: number;
}

interface SongRequest {
  youtubeId: string;
  title: string;
  length: number;
  requestedBy: string;
  isBumped: boolean;
  isShuffled: boolean;
  isShuffleEntered: boolean;
}

/*
{
    "songQueue": [
        {
            "youtubeId": "yUbYhKnzUfM",
            "title": "Clocks (Live)",
            "length": 283,
            "requestedBy": "jsnphil2",
            "isBumped": false,
            "isShuffled": false,
            "isShuffleEntered": false
        }
    ]
}
    */

export default function SongPlayerQueue() {
  /* Song lists */
  const [queueStatus, setQueueStatus] = useState('Closed');
  const [playedSongs, setPlayedSongs] = useState(0);
  const [remainingChannelPointBumps, setRemainingChannelPointBumps] =
    useState(0);
  const [remainingBeanBumps, setRemainingBeanBumps] = useState(0);

  const [songList, setSongList] = useState<SongRequest[]>([]);
  const [songHistory, setSongHistory] = useState<SongListItem[]>([]);
  const [currentSong, setCurrentSong] = useState<SongListItem>();
  const [contenders, setContenders] = useState<SongListItem[]>([]);

  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    'wss://i0qhsp6cw3.execute-api.us-east-1.amazonaws.com/dev'
  );

  const { sendJsonMessage, lastJsonMessage, lastMessage, readyState } =
    useWebSocket(socketUrl, {
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
        console.log(event);
        const message = JSON.parse(event.data);
        console.log(message);
        if (message.songQueue) {
          setSongList(message.songQueue);
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

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
  }[readyState];

  let video;
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    video = event.target.getVideoEmbedCode();
  };

  const playVideo: YouTubeProps['onPlay'] = (event) => {
    event.target.playVideo();
  };

  return (
    <div>
      <YouTube videoId={songList[0]?.youtubeId} onReady={onPlayerReady} />;
      <h1>Queue</h1>
      <button
        onClick={(e) => {
          console.log('Starting YouTube video');
          playVideo();
        }}
      >
        Play
      </button>
      {songList.map((song) => (
        <div key={song.youtubeId}>
          <h2>{song.title}</h2>
          <p>Requested by: {song.requestedBy}</p>
        </div>
      ))}
    </div>
  );
}

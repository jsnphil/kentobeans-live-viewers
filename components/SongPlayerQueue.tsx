'use client';
import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState, Options } from 'react-use-websocket';
import { SongListItem } from './SongRequestTable';
import YouTube, {
  YouTubeEvent,
  YouTubePlayer,
  YouTubeProps
} from 'react-youtube';
import { set } from 'lodash';

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

  const [player, setPlayer] = useState<YouTubePlayer>(null);
  const [playerVolume, setPlayerVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
    setPlayerVolume(event.target.getVolume());
  };

  const onPlayHandler = () => {
    player.playVideo();
    setIsPlaying(true);
  };

  const onPauseHandler = () => {
    player.pauseVideo();
    setIsPlaying(false);
  };

  const volumnUpHandler = () => {
    player.setVolume(player.getVolume() + 10);
    setPlayerVolume(player.getVolume());
  };

  const volumnDownHandler = () => {
    player.setVolume(player.getVolume() - 10);
    setPlayerVolume(player.getVolume());
  };

  const muteHandler = () => {
    if (player.isMuted()) {
      player.unMute();
      setPlayerVolume(player.getVolume());
    } else {
      player.mute();
      setPlayerVolume(0);
    }
  };

  const stopHandler = () => {
    player.stopVideo();
    setIsPlaying(false);
  };

  return (
    <div>
      <YouTube
        videoId={songList[0]?.youtubeId}
        onReady={onReady}
        title='Kentobot Player'
        opts={{
          playerVars: {
            controls: 0
          }
        }}
      />
      <h1>Queue</h1>

      {isPlaying ? (
        <button onClick={onPauseHandler}>Pause</button>
      ) : (
        <button onClick={onPlayHandler}>Play</button>
      )}

      <button onClick={volumnUpHandler}>Volume Up</button>
      <button onClick={volumnDownHandler}>Volume Down</button>
      <button onClick={muteHandler}>Mute</button>
      <button onClick={stopHandler}>Stop</button>
      <button>Open Shuffle</button>
      <button>Next Song</button>
      <p>Volume: {playerVolume}</p>
      {songList.map((song) => (
        <div key={song.youtubeId}>
          <h2>{song.title}</h2>
          <p>Requested by: {song.requestedBy}</p>
        </div>
      ))}
    </div>
  );
}

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
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  Form,
  Row
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faTicket,
  faDice,
  faPlay,
  faPause,
  faStop,
  faVolumeMute,
  faVolumeHigh,
  faVolumeDown,
  faVolumeUp,
  faForward,
  faForwardFast
} from '@fortawesome/free-solid-svg-icons';

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
  length?: number;
  requestedBy: string;
  isBumped?: boolean;
  isShuffled?: boolean;
  isShuffleEntered?: boolean;
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
  const [songHistory, setSongHistory] = useState<SongRequest[]>([]);
  const [currentSong, setCurrentSong] = useState<SongRequest>();
  const [contenders, setContenders] = useState<SongRequest[]>([]);

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
        if (message.currentSong) {
          setCurrentSong(message.currentSong);
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
  const [queueOpen, setQueueOpen] = useState(false);

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

  const nextSongHandler = () => {
    console.log('Next Song');
    sendJsonMessage({
      action: 'sendmessage',
      message: 'songqueue:next'
    });
  };

  return (
    <Container>
      <div>
        <Row>
          <Col md={6}>
            <YouTube
              videoId={currentSong?.youtubeId}
              onReady={onReady}
              title='Kentobot Player'
              opts={{
                playerVars: {
                  controls: 0
                }
              }}
            />
          </Col>
          <Col md={6}>
            <Row>
              <Col>Requests Enabled</Col>
              <Col>
                <Form.Check // prettier-ignore
                  type='switch'
                  id='custom-switch'
                  onChange={(e) => {
                    // TODO Send message to WSS to toggle queue
                    if (queueOpen) {
                      console.log('Closing queue');
                      setQueueOpen(false);
                    } else {
                      console.log('Opening queue');
                      setQueueOpen(true);
                    }
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>Songs requested</Col>
              <Col>{songList.length}</Col>
            </Row>
            <Row>
              <Col>Bumped songs</Col>
              <Col>5</Col>
            </Row>
            <Row>
              <Col>Played Songs</Col>
              <Col>{playedSongs}</Col>
            </Row>
            <Row>
              <Col>
                <Button variant='primary'>Start Stream</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant='primary'>Start Shaffle</Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <ButtonToolbar aria-label='Toolbar with button groups'>
          <ButtonGroup size='lg' aria-label='Basic example'>
            {isPlaying ? (
              <Button variant='primary' title='Pause' onClick={onPauseHandler}>
                <FontAwesomeIcon icon={faPause} />
              </Button>
            ) : (
              <Button title='Play' onClick={onPlayHandler}>
                <FontAwesomeIcon icon={faPlay} />
              </Button>
            )}
            <Button title='Stop' onClick={stopHandler}>
              <FontAwesomeIcon icon={faStop} />
            </Button>
            <Button title='Next Song' onClick={nextSongHandler}>
              <FontAwesomeIcon icon={faForwardFast} />
            </Button>
          </ButtonGroup>
        </ButtonToolbar>

        <ButtonToolbar aria-label='Toolbar with button groups'>
          <ButtonGroup size='lg' aria-label='Basic example'>
            <Button title='Volume Up' onClick={volumnUpHandler}>
              <FontAwesomeIcon icon={faVolumeUp} />
            </Button>
            <Button title='Volume Down' onClick={volumnDownHandler}>
              <FontAwesomeIcon icon={faVolumeDown} />
            </Button>
            <Button title='Mute' onClick={muteHandler}>
              <FontAwesomeIcon icon={faVolumeMute} />
            </Button>
          </ButtonGroup>
        </ButtonToolbar>

        <p>Volume: {playerVolume}%</p>

        <div id='nowPlaying' className='mb-3'>
          <Row>
            <Col className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight text-center'>
              Now Playing
            </Col>
          </Row>
          <Row>
            {currentSong ? (
              <>
                <Col md={9}>{currentSong.title}</Col>
                <Col md={2}>{currentSong.requestedBy}</Col>
                <Col md={1}>{currentSong.length}</Col>
              </>
            ) : (
              <Col md={12}>Nothing playing</Col>
            )}
          </Row>
        </div>
        <Row>
          <Col className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight text-center'>
            Request Queue
          </Col>
        </Row>

        {songList.map((song) => (
          <Row key={song.youtubeId} className='songTableRow'>
            <Col md={9}>{song.title}</Col>
            <Col md={2}>{song.requestedBy}</Col>
            <Col md={1}>{song.length}</Col>
          </Row>
        ))}
      </div>
    </Container>
  );
}

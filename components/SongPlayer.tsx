'use client';
import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faPlay,
  faPause,
  faStop,
  faVolumeMute,
  faVolumeDown,
  faVolumeUp,
  faForwardFast
} from '@fortawesome/free-solid-svg-icons';
import { secondsToMinutes } from '../libs/common';
import SongQueueTableHeading from './SongQueueTableHeading';
import { SongRequest } from '../libs/types';
import SongRequestTable from './SongRequestTable';
import { CurrentSong } from './CurrentSong';
import { set } from 'lodash';

export default function SongPlayer() {
  const [requestsEnabled, setRequestsEnabled] = useState(false);
  const [songList, setSongList] = useState<SongRequest[]>([]);
  const [currentSong, setCurrentSong] = useState<SongRequest>();
  const [player, setPlayer] = useState<YouTubePlayer>(null);
  const [playerVolume, setPlayerVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sotnContenders, setSotnContenders] = useState(0);
  const [streamStarted, setStreamStarted] = useState(false);
  const [playedSongs, setPlayedSongs] = useState(0);

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

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
    setPlayerVolume(event.target.getVolume());
  };

  const onPlayHandler = () => {
    player.playVideo();
    setIsPlaying(true);
    // TODO Send request to API to save song as played (WSS or REST?)
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

  const sotnContenderHandler = () => {
    console.log('Save contender');
  };

  const enableRequestsHandler = () => {
    if (requestsEnabled) {
      console.log('Disabling requests');
      setRequestsEnabled(false);
    } else {
      console.log('Enabling requests');
      setRequestsEnabled(true);
    }

    // TODO Send message to WSS to toggle queue
  };

  const streamHandler = () => {
    if (streamStarted) {
      console.log('Stopping Stream');
      setStreamStarted(false);
    } else {
      console.log('Starting Stream');
      setStreamStarted(true);
    }
  };

  return (
    <Container fluid className='p-4'>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <YouTube
                videoId={currentSong?.youtubeId}
                onReady={onReady}
                title='Kentobot Player'
                opts={{
                  height: '390',
                  width: '100%',
                  playerVars: {
                    controls: 0
                  }
                }}
              />
              <div className='mt-3 d-flex justify-content-center'>
                <ButtonToolbar aria-label='Toolbar with button groups'>
                  <ButtonGroup size='lg' aria-label='Basic example'>
                    {isPlaying ? (
                      <Button
                        variant='primary'
                        title='Pause'
                        onClick={onPauseHandler}
                      >
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
                    <Button title='Volume Up' onClick={volumnUpHandler}>
                      <FontAwesomeIcon icon={faVolumeUp} />
                    </Button>
                    <Button title='Volume Down' onClick={volumnDownHandler}>
                      <FontAwesomeIcon icon={faVolumeDown} />
                    </Button>
                    <Button title='Mute' onClick={muteHandler}>
                      <FontAwesomeIcon icon={faVolumeMute} />
                    </Button>
                    <Button
                      title='Save contender'
                      onClick={sotnContenderHandler}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Queue Information</Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item className='d-flex justify-content-between'>
                  <span>Songs requested:</span>{' '}
                  <span className='ms-auto'>{songList.length}</span>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'>
                  <span>Bumped requests:</span>{' '}
                  <span className='ms-auto'>0</span>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'>
                  <span>Played songs:</span>{' '}
                  <span className='ms-auto'>{playedSongs}</span>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex justify-content-between'>
                  <span>Song of the night contenders:</span>{' '}
                  <span className='ms-auto'>{sotnContenders}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className='mt-3 flex-grow-1 d-flex'>
            <Card.Body className='d-flex flex-column justify-content-end'>
              <Card.Title>Queue controls</Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item className='d-flex justify-content-between'>
                  <span>Requests Enabled</span>{' '}
                  <span className='ms-auto'>
                    <Form.Check // prettier-ignore
                      name='Requests Enabled'
                      type='switch'
                      id='custom-switch'
                      onChange={enableRequestsHandler}
                      checked={requestsEnabled}
                    />
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  {streamStarted ? (
                    <Button className='btn btn-danger' onClick={streamHandler}>
                      Stop Stream
                    </Button>
                  ) : (
                    <Button className='btn btn-primary' onClick={streamHandler}>
                      Start Stream
                    </Button>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className='btn btn-primary'>Start Shaffle</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div id='nowPlaying' className='mt-4'>
        <CurrentSong currentSong={currentSong} />
      </div>

      <div id='songQueue' className='mt-3'>
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
    </Container>
  );
}

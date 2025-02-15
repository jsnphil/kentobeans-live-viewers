import * as path from 'path';

const songRequests = path.join(__dirname, 'song-requests.json');

const loadSongQueue = async () => {
  console.log('Loading song queue from', songRequests);
};

loadSongQueue();

'use-client';

import { SongRequest } from '../../../@types';

export interface SongHistoryProps {
  songsList: SongRequest[];
}

export default function SongHistory({ songsList }: SongHistoryProps) {
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col'>
          <h1>Song History</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>Song Title</th>
                <th scope='col'>Artist</th>
                <th scope='col'>Requester</th>
                <th scope='col'>Date Requested</th>
              </tr>
            </thead>
            <tbody>
              {songsList.map((song) => (
                <tr key={song.id}>
                  <td>{song.song.title}</td>
                  <td>{song.song.artist}</td>
                  <td>{song.requester}</td>
                  <td>{new Date(song.requestedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

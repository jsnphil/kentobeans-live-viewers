'use client';
import {
  faSpotify,
  faApple,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav } from 'react-bootstrap';

export default function SotnPlaylists() {
  return (
    <div>
      <Nav className='justify-content-center pb-3'>
        <Nav.Item>
          <Nav.Link
            href='https://open.spotify.com/user/kmccarthy-10/playlist/6dQZxnjBTmuV8K5ncmT31B?si=wT26ziBKRemnECwToIlrhg'
            target='_blank'
          >
            <FontAwesomeIcon icon={faSpotify} /> Spotify
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href='https://music.apple.com/ca/playlist/kentobeans-sotn-winners/pl.u-LdbqqlgukqdRmr'
            target='_blank'
          >
            <FontAwesomeIcon icon={faApple} /> Apple Music
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href='https://www.youtube.com/channel/UCjBaONaNwiczErfou7hPRsg/playlists?view=50&sort=dd&shelf_id=1'
            target='_blank'
          >
            <FontAwesomeIcon icon={faYoutube} /> YouTube
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

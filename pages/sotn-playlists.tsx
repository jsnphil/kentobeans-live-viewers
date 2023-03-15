import { NextPage } from 'next';
import { Col, Container, Row } from 'react-bootstrap';
import EmbeddedYouTubePlaylist from '../components/EmbeddedYouTubePlaylist';

const playlists: string[] = [
  'PL2ys-MALJnBNT-UPasYurFUWY0JzedPqi',
  'PL2ys-MALJnBMflbSjmLwM1xL08WtoeNdX',
  'PL2ys-MALJnBO0-scqRZ3kpYMyK7M46o7Q',
  'PL2ys-MALJnBPGD8ON5yFqDW3a-ZwQVWbh',
  'PL2ys-MALJnBMLjX50X5ylG36toEoVeWKI',
  'PL2ys-MALJnBNExRx_qJFjuiiB6YblLUqA',
  'PL2ys-MALJnBMjRGCXjyuckNgwbBG3MbT9',
  'PL2ys-MALJnBOep2f2_Qk6NpzlGxi682KU',
  'PL2ys-MALJnBMMyge2iSYoCvhI0TYXBVwM',
  'PL2ys-MALJnBM4nggQsWTpmJYmp7Tbq-NO',
  'PL2ys-MALJnBPw1xHdSceJuks6kG1zOuUf',
  'PL2ys-MALJnBMjreFUnLl68JsxeDZP1TmR'
];

const numberOfRows = Math.ceil(playlists.length / 2);
let rows;

const setupRows = () => {
  for (let i = 0; i < playlists.length; i + 2) {
    rows.push({
      col1: playlists[i],
      col2: playlists[i + 1]
    });
  }
};

const SongOfTheNightPlaylists: NextPage = () => {
  return (
    <>
      <div className='d-none d-xl-block mb-5'>
        <div className='container d-flex aligns-items-center justify-content-center'></div>
      </div>
    </>
  );
};

export default SongOfTheNightPlaylists;

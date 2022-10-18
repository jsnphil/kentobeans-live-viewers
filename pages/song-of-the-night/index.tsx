import { NextPage } from 'next';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from './sotn.module.css';

const currentSeason = '12'; // TODO Get from AWS?
const SongOfTheNightStandings: NextPage = () => {
  const [seasonState, setSeasonState] = useState(currentSeason);

  const handleMenuChange = async (event: any) => {
    event.preventDefault();

    setSeasonState(event.target.value);
  };

  const seasons = [];
  for (let season = Number.parseInt(currentSeason); season >= 1; season--) {
    seasons.push(season);
  }

  return (
    <>
      <main>
        <div className='container d-xl-none d-xl-block mb-5 mt-5  aligns-items-center justify-content-center'>
          Season DropDown
        </div>
        <div className='d-none d-xl-block mb-5'>
          <div className='container d-flex aligns-items-center justify-content-center'>
            <div id='menuTop' className='innerContainer'>
              <button
                name='season12'
                className={`button ${styles.sotnSeasonButton} leftButtonA ${
                  seasonState === '12' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('12');
                }}
              >
                12
              </button>
              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '11' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('11');
                }}
              >
                11
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '10' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('10');
                }}
              >
                10
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '9' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('9');
                }}
              >
                9
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '8' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('8');
                }}
              >
                8
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '7' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('7');
                }}
              >
                7
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '6' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('6');
                }}
              >
                6
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '5' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('5');
                }}
              >
                5
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '4' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('4');
                }}
              >
                4
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '3' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('3');
                }}
              >
                3
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} midButton ${
                  seasonState === '2' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('2');
                }}
              >
                2
              </button>

              <button
                className={`button ${styles.sotnSeasonButton} rightButtonA ${
                  seasonState === '1' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setSeasonState('1');
                }}
              >
                1
              </button>
            </div>
          </div>
        </div>
        {/* <div className='container mb-5 mt-5 aligns-items-center justify-content-center'>
          <Form>
            <Form.Group
              className='mb5 form-inline'
              controlId='seasonSelectorControl'
            >
              <Form.Label>Season:</Form.Label>

              <Form.Select id='seasonSelector' onChange={handleMenuChange}>
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </div> */}
        Standings for Season {seasonState}
      </main>
    </>
  );
};

export default SongOfTheNightStandings;

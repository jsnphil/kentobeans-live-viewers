'use client';

import { useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from '../../sotn.module.css';
import WinnersList from './WinnersList';

const currentSeason = '12'; // TODO Get from AWS?
export default function Standings() {
  const [seasonState, setSeasonState] = useState(currentSeason);

  const handleMenuChange = async (event: any) => {
    event.preventDefault();

    setSeasonState(event.target.value);
  };

  const seasons = [];
  const seasonButtons = [];
  for (let season = Number.parseInt(currentSeason); season >= 1; season--) {
    seasons.push(season);
  }
  return (
    <>
      <div className='container d-xl-none d-xl-block mb-5 mt-5  aligns-items-center justify-content-center'>
        <div className='container mb-5 mt-5 aligns-items-center justify-content-center'>
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
        </div>
        <WinnersList />
      </div>
      <div className='d-none d-xl-block'>
        <div className='container d-flex aligns-items-center justify-content-center mb-5'>
          {/* TODO Convert this to CSS in sotn.modules.css file */}
          {/* <div id='menuTop' className='innerContainer'> */}
          {seasons.map((seasonNumber, index) => (
            <button
              name={`season${seasonNumber}`}
              className={`button ${styles.sotnSeasonButton} ${
                seasonState === Number(seasonNumber).toString()
                  ? 'selected'
                  : ''
              }
                  
                  ${index === 0 ? `roundedTopLeft roundedBottomLeft` : ''}

                  ${
                    index === seasons.length - 1
                      ? `roundedTopRight roundedBottomRight`
                      : ''
                  }
                  
                  `}
              onClick={(e) => {
                setSeasonState(Number(seasonNumber).toString());
              }}
              key={index}
            >
              {seasonNumber}
            </button>
          ))}
          {/* </div> */}
        </div>
        <WinnersList />
      </div>
    </>
  );
}

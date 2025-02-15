'use client';

import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from '../../sotn.module.css';
import WinnersList from './WinnersList';
import { SotnWinner } from '../../../../@types';
import { get } from 'lodash';
import LoadingSpinner from '../../../../components/LoadingSpinner';

export interface SotnStandingsData {
  data: SotnWinnerData;
}

interface SotnWinnerData {
  count: number;
  winners: SotnWinner[];
  latestSeason: string;
}

const currentSeason = '12'; // TODO Get from AWS?
export default function Standings(standings: SotnWinnerData) {
  const [season, setSeason] = useState(currentSeason);
  const [data, setData] = useState(standings.winners);
  const [loading, setLoading] = useState(true);
  const hasPageBeenRendered = useRef(false);

  // Fetching the SOTN data
  useEffect(() => {
    // Prevent calling the API on the first render, since it was already called on the server
    if (hasPageBeenRendered.current) {
      fetch(
        `https://6dpo5kprt9.execute-api.us-east-1.amazonaws.com/prod/song-of-the-night/winning-requests?season=${season}`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data.winners);
          setLoading(false);
        });
    } else {
      hasPageBeenRendered.current = true;
    }
  }, [season, standings.latestSeason]);

  // Season selector controls
  const handleMenuChange = async (event: any) => {
    event.preventDefault();

    setSeason(event.target.value);
    setLoading(true);
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
        <WinnersList winners={data} />
      </div>
      <div className='d-none d-xl-block'>
        <div className='container d-flex aligns-items-center justify-content-center mb-5'>
          {/* TODO Convert this to CSS in sotn.modules.css file */}
          {/* <div id='menuTop' className='innerContainer'> */}
          {seasons.map((seasonNumber, index) => (
            <button
              name={`season${seasonNumber}`}
              className={`button ${styles.sotnSeasonButton} ${
                season === Number(seasonNumber).toString() ? 'selected' : ''
              }
                  
                  ${index === 0 ? `roundedTopLeft roundedBottomLeft` : ''}

                  ${
                    index === seasons.length - 1
                      ? `roundedTopRight roundedBottomRight`
                      : ''
                  }
                  
                  `}
              onClick={(e) => {
                setSeason(Number(seasonNumber).toString());
              }}
              key={index}
            >
              {seasonNumber}
            </button>
          ))}
          {/* </div> */}
        </div>
        {!data || loading ? (
          <LoadingSpinner message='Loading SOTN Data' />
        ) : (
          <WinnersList winners={data} />
        )}
      </div>
    </>
  );
}

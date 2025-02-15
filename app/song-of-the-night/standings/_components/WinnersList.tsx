import { Row, Col } from 'react-bootstrap';
import { SotnWinner, SotnWinnerData } from '../../../../@types';
import { processSotnData } from '../../../../libs/sotn-utils';
import { getArtistValue, getDate } from '../../../../utils/sotn-utils';
import styles from '../../sotn.module.css';

export interface WinnersListProps {
  winners: SotnWinner[];
}
export default function WinnersList(winnersList: WinnersListProps) {
  const winnerData = processSotnData(winnersList.winners);

  return (
    <div>
      {winnerData?.map((winner: SotnWinnerData, index: number) => (
        <div className='pb-5 rounded-circle' key={index}>
          <Row>
            <Col className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight'>
              {winner.username} - {winner.songs.length}{' '}
              {winner.songs.length == 1 ? 'win' : 'wins'}
            </Col>
          </Row>
          {winner.songs!.map((song: SotnWinner, index: number) => (
            <div className={`${styles.winnerRow}`} key={index}>
              <a
                href={`https://youtu.be/${song.youtubeId}`}
                target='_blank'
                rel='noreferrer'
              >
                <Row>
                  <Col xs={4}>{song.title}</Col>
                  <Col xs={4}>
                    {getArtistValue(song.artist, song.featuredArtist)}
                  </Col>
                  <Col>{song.year}</Col>
                  <Col>{getDate(song.streamDate)}</Col>
                </Row>
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

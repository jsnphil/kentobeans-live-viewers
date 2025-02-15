import { Col, Row } from 'react-bootstrap';
import styles from '../styles/songlist.module.css';

interface StreamInfoProps {
  queueStatus: string;
  playedSongs: number;
  remainingBeanBumps: number;
  remainingChannelPointBumps: number;
}

export const StreamInfo = (props: StreamInfoProps) => {
  const {
    queueStatus,
    playedSongs,
    remainingBeanBumps,
    remainingChannelPointBumps
  } = props;

  return (
    <div className={`${styles.songlistSummary} pb-3 text-center`}>
      <Row
        className={`${styles.songlistSummaryHeading} py-2 px-2 roundedTopLeft  roundedTopRight `}
      >
        <Col>Queue Status</Col>
        <Col>Songs Played</Col>
        <Col>Bean Bumps</Col>
        <Col>Point Bumps</Col>
      </Row>
      <Row
        className={`${styles.songlistSummaryData} py-2 px-2 fs-6 roundedBottomLeft roundedBottomRight`}
      >
        <Col>{queueStatus}</Col>
        <Col>{playedSongs}</Col>
        <Col>{remainingBeanBumps}</Col>
        <Col>{remainingChannelPointBumps}</Col>
      </Row>
    </div>
  );
};

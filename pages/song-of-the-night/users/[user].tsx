import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Col, Container, Row, Table } from 'react-bootstrap';
import styles from '../sotn.module.css';

const SotnUserStats: NextPage = () => {
  const router = useRouter();
  const { user } = router.query;
  return (
    <>
      <main>
        <div className='container d-xl-none d-xl-block mb-5 mt-5  aligns-items-center justify-content-center'>
          <div className='container mb-5 mt-5 aligns-items-center justify-content-center'>
            Small screen view
          </div>
        </div>
        <div className='d-none d-xl-block mb-5'>
          <h1>{user}</h1>
          <h2>User Summary</h2>
          <hr />
          <div className='container d-flex aligns-items-center justify-content-center mb-5'>
            <Table>
              <tbody>
                <tr>
                  <td>Song of the Night Wins</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Season Championship Wins</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Song of the Season Wins</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Longest Win Streak</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Most Recent Win</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Longest Gap Between Wins</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>Shortest Gap Between Wins</td>
                  <td>10</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <hr />
          <h2>Winning Songs by Season</h2>
          <Container>
            <div className='pb-3'>
              <Row
                className={`${styles.winnersheading} ${styles.roundedTopLeft} ${styles.roundedBottomLeft} ${styles.roundedTopRight} ${styles.roundedBottomRight}`}
              >
                <Col xs={4}>Song Title</Col>
                <Col xs={4}>Artist</Col>
                <Col>Year</Col>
                <Col>Stream Date</Col>
              </Row>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
};

export default SotnUserStats;

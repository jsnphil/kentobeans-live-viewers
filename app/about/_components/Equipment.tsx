import { Container, Row, Col } from 'react-bootstrap';

export default function Equipment() {
  return (
    <div>
      <p className='h2 pt-3'>Equipment</p>
      <Container>
        <Row className='subheading roundedTopLeft roundedBottomLeft roundedTopRight roundedBottomRight'>
          <Col>Drums</Col>
          <Col>Streaming</Col>
        </Row>
        <Row>
          <Col>
            Gretsch Renown Maple drum set (10&quot;, 12&quot;, 14&quot;,
            22&quot;)
          </Col>
          <Col>Focusrite Clarett 8Pre</Col>
        </Row>
        <Row>
          <Col>
            DW Collector&apos;s Series Black Nickel over Brass 6.5&quot; x
            14&quot; snare drum
          </Col>
          <Col>Sony a6000</Col>
        </Row>
        <Row>
          <Col>Zildjian K Custom Hybrid 14.25&quot; hi-hats</Col>
          <Col>Logitech C920</Col>
        </Row>
        <Row>
          <Col>Zildjian K Custom Hybrid 17&quot; crash cymbal</Col>
          <Col>GVM 48&quot; camera slider</Col>
        </Row>
        <Row>
          <Col>Sabian AA 18&quot; medium crash cymbal</Col>
          <Col>Soundcraft Notepad-8FX</Col>
        </Row>
        <Row>
          <Col>Zildjian K Custom Hybrid 21&quot; ride cymbal</Col>
          <Col>Logitech Brio</Col>
        </Row>
        <Row>
          <Col>Meinl Classics Custom 12&quot; Dark trash stack</Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
}

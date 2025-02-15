import { Container } from 'react-bootstrap';
import { StreamSongLists } from '../../components/StreamSongLists';

export default async function Page() {
  return (
    <Container>
      <StreamSongLists />
    </Container>
  );
}

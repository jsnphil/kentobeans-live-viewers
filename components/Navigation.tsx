import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../public/logo.png';
import Image from 'next/image';
import { Nav, NavDropdown } from 'react-bootstrap';
import { signOut, useSession } from 'next-auth/react';
import UserNavItem from './UserNavItem';
import { useRouter } from 'next/router';

const getLinkPrefix = () => {
  const router = useRouter();
  if (router.asPath.startsWith('/song-of-the-night')) {
    console.log('On a SOTN page');
  }
  return '';
};

function Navigation() {
  const { data: session } = useSession();

  const router = useRouter();
  console.log(`asPath: ${router.asPath}`);
  console.log(`pathname: ${router.pathname}`);
  console.log(`basePath: ${router.basePath}`);

  return (
    <>
      <Navbar id='navbar' expand='lg' bg='dark' variant='dark'>
        <Container id='navContainer'>
          <Navbar.Brand id='brandLogo' href='/'>
            <Image
              id='kentobeansLogo'
              src={logo}
              alt='Kentobeans Logo'
              width='30'
              height='30'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='../commands' id='commandsLink'>
                Kentobot Commands
              </Nav.Link>
              <Nav.Link href='../request-rules' id='requestRulesLink'>
                Request Rules
              </Nav.Link>
              <Nav.Link href='../songlist' id='songlistLink'>
                Stream Songlist
              </Nav.Link>
              <Nav.Link href='../song-history' id='songHistoryLink'>
                Song History
              </Nav.Link>

              <NavDropdown title='Song of the Night' id='sotnDropdown'>
                <NavDropdown.Item
                  id='sotnStandingsLink'
                  href='../song-of-the-night/standings'
                >
                  Standings
                </NavDropdown.Item>
                <NavDropdown.Item
                  id='sotnUsersLink'
                  href='../song-of-the-night/users'
                  disabled
                >
                  User Stats
                </NavDropdown.Item>
                <NavDropdown.Item
                  id='sotnSongsLink'
                  href='../song-of-the-night/songs-stats'
                  disabled
                >
                  Song Stats
                </NavDropdown.Item>
                <NavDropdown.Item
                  id='sotnSongsLink'
                  href='../song-of-the-night/songs'
                >
                  All Songs
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item id='playlistLink' href='/sotn-playlists'>
                  Playlists
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item
                  id='tournamentsLink'
                  href='#action/3.2'
                  disabled
                >
                  Tournaments
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title='Bean Rewards' id='rewardsDropdown' disabled>
                <NavDropdown.Item id='livelearn' href='#action/3.1'>
                  Live Learn
                </NavDropdown.Item>
                <NavDropdown.Item id='djhour' href='#action/3.2'>
                  DJ Hour
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end'>
            <UserNavItem />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;

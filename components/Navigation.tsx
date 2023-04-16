import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../public/logo.png';
import Image from 'next/image';
import { Nav, NavDropdown } from 'react-bootstrap';
import { signOut, useSession } from 'next-auth/react';
import UserNavItem from './UserNavItem';
import { useRouter } from 'next/router';

const useNavLink = (linkPath: string) => {
  const router = useRouter();
  const activePage = router.asPath;

  const numberOfParts = activePage.split('/').length - 1;

  let link = linkPath;
  for (let i = 0; i < numberOfParts; i++) {
    link = '../' + link;
  }

  return link;
};

function Navigation() {
  const { data: session } = useSession();

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
              <Nav.Link href={useNavLink('commands')} id='commandsLink'>
                Kentobot Commands
              </Nav.Link>
              <Nav.Link
                href={useNavLink('request-rules')}
                id='requestRulesLink'
              >
                Request Rules
              </Nav.Link>
              <Nav.Link href={useNavLink('songlist')} id='songlistLink'>
                Stream Songlist
              </Nav.Link>
              <Nav.Link href={useNavLink('song-history')} id='songHistoryLink'>
                Song History
              </Nav.Link>

              <NavDropdown title='Song of the Night' id='sotnDropdown'>
                <NavDropdown.Item
                  id='sotnStandingsLink'
                  href={useNavLink('song-of-the-night/standings')}
                >
                  Standings
                </NavDropdown.Item>
                <NavDropdown.Item
                  id='sotnUsersLink'
                  href={useNavLink('song-of-the-night/users')}
                >
                  User Stats
                </NavDropdown.Item>
                {/* <NavDropdown.Item
                  id='sotnSongsLink'
                  href={useNavLink('song-of-the-night/song-stats')}
                  disabled
                >
                  Song Stats
                </NavDropdown.Item> */}
                <NavDropdown.Item
                  id='sotnSongsLink'
                  href={useNavLink('song-of-the-night/songs')}
                >
                  All Songs
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

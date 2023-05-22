import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../public/logo.png';
import Image from 'next/image';
import { Nav, NavDropdown } from 'react-bootstrap';
import { signOut, useSession } from 'next-auth/react';
import UserNavItem from './UserNavItem';
import { useRouter } from 'next/router';
import Link from 'next/link';

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
              <Link href='/' passHref>
                <Nav.Link as='span'>Home</Nav.Link>
              </Link>
              <Link href={useNavLink('commands')} id='commandsLink'>
                <Nav.Link as='span'>Kentobot Commands</Nav.Link>
              </Link>

              {/* <Link
                href={useNavLink('request-rules')}
                id='requestRulesLink'
                passHref
              > 
                <Nav.Link as='span'>Request Rules</Nav.Link>
              </Link>*/}
              <Link href={useNavLink('songlist')} id='songlistLink' passHref>
                <Nav.Link as='span'>Stream Songlist</Nav.Link>
              </Link>
              <Link
                href={useNavLink('song-history')}
                id='songHistoryLink'
                passHref
              >
                <Nav.Link as='span'>Song History</Nav.Link>
              </Link>
              <NavDropdown title='Song of the Night' id='sotnDropdown'>
                <Link
                  id='sotnStandingsLink'
                  href={useNavLink('song-of-the-night/standings')}
                  passHref
                >
                  <NavDropdown.Item as='span'>Standings</NavDropdown.Item>
                </Link>
                <Link
                  id='sotnUsersLink'
                  href={useNavLink('song-of-the-night/users')}
                  passHref
                >
                  <NavDropdown.Item as='span'>User Stats</NavDropdown.Item>
                </Link>
                {/* <NavDropdown.Item
                  id='sotnSongsLink'
                  href={useNavLink('song-of-the-night/song-stats')}
                  disabled
                >
                  Song Stats
                </NavDropdown.Item> */}
                <Link
                  id='sotnSongsLink'
                  href={useNavLink('song-of-the-night/songs')}
                  passHref
                >
                  <NavDropdown.Item as='span'>All Songs</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />

                <Link id='tournamentsLink' href='#action/3.2' passHref>
                  <NavDropdown.Item disabled as='span'>
                    Tournaments
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>

              <NavDropdown title='Bean Rewards' id='rewardsDropdown' disabled>
                <Link id='livelearn' href='#action/3.1' passHref>
                  <NavDropdown.Item as='span'>Live Learn</NavDropdown.Item>
                </Link>
                <Link id='djhour' href='#action/3.2' passHref>
                  <NavDropdown.Item as='span'>DJ Hour</NavDropdown.Item>
                </Link>
              </NavDropdown>
              <Link href={useNavLink('about')} id='aboutLink'>
                <Nav.Link as='span'>About</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>

          {/* <Navbar.Collapse className='justify-content-end'>
            <UserNavItem />
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;

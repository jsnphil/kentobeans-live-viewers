import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, Navbar, NavDropdown } from 'react-bootstrap';

function UserNavItem() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Navbar.Text>
          <img src={session?.user?.image!} width='30px' height={30} />
          &nbsp;
          {session?.user?.name}
          &nbsp;
        </Navbar.Text>
        <Navbar.Text>
          {
            <Button variant='secondary' size='sm' onClick={() => signOut()}>
              Logout <FontAwesomeIcon icon={faUnlock} />
            </Button>
          }
        </Navbar.Text>
      </>
    );
  }

  return (
    <>
      <Button variant='secondary' size='sm' onClick={() => signIn()}>
        {' '}
        Login <FontAwesomeIcon icon={faLock} />
      </Button>
    </>
  );
}

export default UserNavItem;

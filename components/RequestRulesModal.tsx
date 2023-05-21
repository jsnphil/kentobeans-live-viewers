import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { cookies } from 'next/headers';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

function RequestRulesModal() {
  const ACCEPT_RULES_COOKIE_NAME = 'kb-song-rules';

  const [show, setShow] = useState(false);

  const handleClose = () => {
    addCookie();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const addCookie = () => {
    const expirationDate = new Date(
      new Date().getMilliseconds() + 5 * 60 * 1000
    );
    setCookie(ACCEPT_RULES_COOKIE_NAME, true, {
      // expires: expirationDate
      maxAge: 30 * 24 * 60 * 60
    });
  };

  useEffect(() => {
    if (
      hasCookie(ACCEPT_RULES_COOKIE_NAME, {}) &&
      getCookie(ACCEPT_RULES_COOKIE_NAME)
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  return (
    <>
      <Modal show={show} backdrop='static' onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Song Request Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Only 1 song is allowed in the song queue per person at one time.
            </li>
            <li>You must be present for your request to be played.</li>
            <li>
              Song lyrics must be in English only, with limited exceptions for
              songs like anime theme and/or well-known video game music
            </li>
            <li>
              You can bump a request to the top of the queue for free for 300
              beans or 6000 channel points. You can also bump with at least a
              $3.00 tip, by subscribing, or by gifting a sub. Bump are limited
              to 1 free and 1 one paid per person per stream. Bean bumps are
              limited to once per week per user.
            </li>
            <li>
              Please avoid requests that involve a lot double bass/kick drum
              and/or metal songs.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RequestRulesModal;

'use client';

import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CommandTable from './CommandTable';
import SongRequestCommands from '../../../data/songRequest.json';
import SoundEffectsCommands from '../../../data/soundEffects.json';
import RewardRedemptionCommands from '../../../data/rewardRedemptions.json';
import OtherCommands from '../../../data/otherCommands.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export default function Commands() {
  const [commandState, setCommandState] = useState('songRequestCmds');

  const handleMenuChange = async (event: any) => {
    event.preventDefault();

    setCommandState(event.target.value);
  };

  return (
    <>
      <div className='container d-xl-none d-xl-block mb-5 mt-5  aligns-items-center justify-content-center'>
        <Form>
          <Form.Group className='mb-5' controlId='secondaryNavDropDown'>
            <Form.Select id='secondaryNav' onChange={handleMenuChange}>
              <option value='songRequestCmds'>Song Requests</option>
              <option value='soundEffectCmds'>Sound Effects</option>
              <option value='rewardRedepemtionCmds'>Reward Redemption</option>
              <option value='otherCmds'>Other</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </div>
      <div className='d-none d-xl-block mb-5'>
        <div className='container d-flex aligns-items-center justify-content-center'>
          <div id='menuTop' className='innerContainer'>
            <button
              name='songRequestCmds'
              className={`button buttonMenu
     roundedTopLeft roundedBottomLeft ${
       commandState === 'songRequestCmds' ? 'selected' : ''
     }`}
              onClick={(e) => {
                setCommandState('songRequestCmds');
              }}
            >
              Song Requests
            </button>
            <button
              className={`button buttonMenu  ${
                commandState === 'soundEffectCmds' ? `selected` : ''
              }`}
              onClick={(e) => {
                setCommandState('soundEffectCmds');
              }}
            >
              Sound Effects
            </button>
            <button
              className={`button buttonMenu ${
                commandState === 'rewardRedepemtionCmds' ? 'selected' : ''
              }`}
              onClick={(e) => {
                setCommandState('rewardRedepemtionCmds');
              }}
            >
              Reward Redemption
            </button>
            <button
              className={`button buttonMenu roundedTopRight roundedBottomRight ${
                commandState === 'otherCmds' ? 'selected' : ''
              }`}
              onClick={(e) => {
                setCommandState('otherCmds');
              }}
            >
              Other
            </button>
          </div>
        </div>
      </div>
      {commandState === 'songRequestCmds' && (
        <CommandTable commands={SongRequestCommands} />
      )}
      {commandState === 'soundEffectCmds' && (
        <>
          <CommandTable commands={SoundEffectsCommands} />
          <p>
            <FontAwesomeIcon icon={faCircleInfo} /> All sound effects cost 20
            beans to redeem
          </p>
        </>
      )}

      {commandState === 'rewardRedepemtionCmds' && (
        <CommandTable commands={RewardRedemptionCommands} />
      )}
      {commandState === 'otherCmds' && (
        <CommandTable commands={OtherCommands} />
      )}
    </>
  );
}

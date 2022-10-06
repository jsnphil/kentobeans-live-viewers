import type { NextPage } from 'next';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import CommandTable from '../components/CommandTable';
import SongRequestCommands from '../data/songRequest.json';
import SoundEffectsCommands from '../data/soundEffects.json';
import RewardRedemptionCommands from '../data/rewardRedemptions.json';
import OtherCommands from '../data/otherCommands.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Commands: NextPage = () => {
  const [commandState, setCommandState] = useState('songRequestCmds');

  const handleMenuChange = async (event: any) => {
    event.preventDefault();

    setCommandState(event.target.value);
  };

  return (
    <div>
      <main>
        <div className='container d-xl-none d-xl-block mb-5 mt-5  aligns-items-center justify-content-center'>
          <Form>
            <Form.Group className='mb5' controlId='secondaryNavDropDown'>
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
                className={`button buttonMenu leftButtonA ${
                  commandState === 'songRequestCmds' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setCommandState('songRequestCmds');
                }}
              >
                Song Requests
              </button>
              <button
                className={`button buttonMenu midButton ${
                  commandState === 'soundEffectCmds' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setCommandState('soundEffectCmds');
                }}
              >
                Sound Effects
              </button>
              <button
                className={`button buttonMenu midButton ${
                  commandState === 'rewardRedepemtionCmds' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setCommandState('rewardRedepemtionCmds');
                }}
              >
                Reward Redemption
              </button>
              <button
                className={`button buttonMenu rightButtonA ${
                  commandState === 'otherCmds' ? 'selected' : ''
                }`}
                onClick={(e) => {
                  setCommandState('otherCmds');
                }}
              >
                Other{' '}
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
      </main>
    </div>
  );
};

export default Commands;

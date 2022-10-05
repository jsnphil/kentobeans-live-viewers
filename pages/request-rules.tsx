import { NextPage } from 'next';

const RequestRules: NextPage = () => {
  return (
    <>
      <div className='pt-5'>
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
            $3.00 tip, by subscribing, or by gifting a sub. Bump are limited to
            1 free and 1 one paid per person per stream. Bean bumps are limited
            to once per week per user.
          </li>
          <li>
            Please avoid requests that involve a lot double bass/kick drum
            and/or metal songs.
          </li>
        </ul>
      </div>
    </>
  );
};

export default RequestRules;

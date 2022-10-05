import { NextPage } from 'next';
import React, { useEffect } from 'react';

const Shop: NextPage = () => {
  useEffect(() => {
    window.location.href = 'https://kentobeans.store';
  }, []);

  return (
    <div className='pt-5'>
      <p>
        Redirecting to the Kentobeans merch store. If you are not automatically
        redirected, click <a href='https://kentobeans.store'>here</a>.
      </p>
    </div>
  );
};

export default Shop;

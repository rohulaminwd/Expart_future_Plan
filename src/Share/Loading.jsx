
import React from 'react';
import { FidgetSpinner } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='pb-[200px]'>
        <FidgetSpinner
          visible={true}
          height="150"
          width="150"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={['#ff0000', '#00ff00', '#0000ff']}
          backgroundColor="#F4442E"
        />
      </div>
    </div>
  );
};

export default Loading;

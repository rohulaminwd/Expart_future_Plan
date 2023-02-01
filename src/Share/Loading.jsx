
import React from 'react';
import { FidgetSpinner } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <FidgetSpinner
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={['#ff0000', '#00ff00', '#0000ff']}
        backgroundColor="#F4442E"
      />
    </div>
  );
};

export default Loading;

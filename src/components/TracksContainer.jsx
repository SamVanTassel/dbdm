import React from 'react';
import { hot } from 'react-hot-loader';
import Track from './Track'

function TracksContainer() {
  return (
    <div className="App">
      <Track />
    </div>
  );
};

export default hot(module)(TracksContainer);
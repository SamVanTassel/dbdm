import React from 'react';
import { hot } from 'react-hot-loader';
import Track from './Track'

function TracksContainer() {
  const tracks = ['OH', 'CH', 'SD', 'BD'];
  tracks.map((sound, i) => {
    return <Track className="track" key={`track${i}`} sound={sound}/>;
  });
  return (
    <div id="tracksContainer">
      {
      tracks.map((sound, i) => {
        return <Track className="track" key={`track${i}`} sound={sound}/>;
      })
       }
    </div>
  );
};

export default hot(module)(TracksContainer);
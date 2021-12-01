import React from 'react';
import Track from './Track.jsx'

const TracksContainer = () => {
  const tracks = ['OH', 'CH', 'SD', 'BD'];

  return (
    <div id="tracksContainer">
      {tracks.map((sound, i) => {
          return <Track className="track" key={`track${i}`} sound={sound}/>;
      })}
    </div>
  );
};

export default TracksContainer;
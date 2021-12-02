import React from 'react';
import Track from './Track.jsx'

const TracksContainer = (props) => {
  const tracks = props.tracks;

  return (
    <div id="tracksContainer">
      {tracks.map((sound, i) => {
          return <Track className="track" key={`track${i}`} sound={sound} index={i} changeWords={props.changeWords} />;
      })}
    </div>
  );
};

export default TracksContainer;
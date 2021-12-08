import React from 'react';
import Track from './Track.jsx'

const TracksContainer = (props) => {
  const tracks = props.tracks;

  return (
    <div id="tracksContainer">
      {tracks.map((sound, i) => {
          return (
            <Track 
              className="track" key={`track${i}`} mp3={sound.mp3}
              name={sound.id} index={i} words={props.words}
              changeWords={props.changeWords} />
          );
      })}
    </div>
  );
};

export default TracksContainer;
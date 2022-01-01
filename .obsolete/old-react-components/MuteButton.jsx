import React from 'react';
import * as Tone from 'tone';

Tone.Transport.bpm.value = 120;

const synth = new Tone.Synth().toDestination()

const Mute = (props) => {
  const player = new Tone.Player(props.mp3).toDestination();

  function myFunc() {
    player.start()
    
    // fetch('/api/mute')
    //   .then((res) => res.json())
    //   .then((data) => window.alert(data.message))
  }

  return <button className="mute" onClick={() => myFunc()}>{props.name}</button>
}

export default Mute;
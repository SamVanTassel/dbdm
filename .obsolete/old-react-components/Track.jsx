import React, { useState } from 'react';
import Mute from './MuteButton.jsx';
import Load from './LoadButton.jsx';
import Clear from './ClearButton.jsx';
import Save from './SaveButton.jsx';
import * as Tone from 'tone';

Tone.Transport.bpm.value =80;

const Track = (props) => {

  // Create 16 step array in state
  const [pattern, updatePattern] = useState(new Array(16).fill(false));
  const [memoryNumber, updateMemory] = useState(1);

  // cycle through pattern and play notes
  const player = new Tone.Player(props.mp3).toDestination();
  const loop = new Tone.Loop((time, step = 0) => {
    if (pattern[step]) player.start();
    step = step + 1 % 16
  }, "4n");
  Tone.Transport.start();
  loop.start(0)

  // Toggle pad and update state with new pattern
  function turnOn(id) {
    pattern[id] ? pattern[id] = false : pattern[id] = true;
    updatePattern([...pattern]);
  }
  
  // Update current slot in state for database operations
  function changeSlot(e) {
    updateMemory(Number(e.target.value));
  }

  // Create pads. Every fourth step will be colored differently for ease of use.
  // Each pad will have have a class 'active' only if its location in pattern is set to true
  const pads = [];
  for (let i = 0; i < 16; i++) {
    pads.push(
      <button 
        className={`${i % 4 === 0 ? 'pad4' : 'pad'} ${pattern[i] ? 'active' : null}`} 
        key={`pad${i}`} 
        id={i} 
        onClick={() => turnOn(i)}
        />);
  }

  return (
    <div className="track">
      <Mute name={props.name} mp3={props.mp3} />
      {pads}
      <Clear updatePattern={updatePattern}>CLR</Clear>
      <Save 
        pattern={pattern} bank={props.name} trackIndex = {props.index}
        slot={memoryNumber} words={props.words} changeWords={props.changeWords} >
          SAVE
      </Save>
      <Load 
        bank={props.name} slot={memoryNumber} trackIndex = {props.index}
        updatePattern={updatePattern} changeWords={props.changeWords}>
          LOAD
      </Load>
      <input type="number" min="1" max="8" value={memoryNumber} onChange={(e) => changeSlot(e)}></input>
    </div>
  );
};

export default Track;
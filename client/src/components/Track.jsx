import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import Mute from './MuteButton';
import Load from './LoadButton';
import Clear from './ClearButton';
import Save from './SaveButton';

function Track(props) {
  // Create 16 step array in state
  const [pattern, updatePattern] = useState(new Array(16).fill(false));
  const [memoryNumber, updateMemory] = useState(1);

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
      <Mute sound={props.sound} />
      {pads}
      <Clear updatePattern={updatePattern}>CLR</Clear>
      <Save pattern={pattern} slot={memoryNumber}>SAVE</Save>
      <Load pattern={pattern} slot={memoryNumber} updatePattern={updatePattern}>LOAD</Load>
      <input type="number" value={memoryNumber} onChange={(e) => changeSlot(e)}></input>
    </div>
  );
};

export default hot(module)(Track);
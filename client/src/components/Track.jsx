import React, { useState } from 'react';
import Mute from './MuteButton.jsx';
import Load from './LoadButton.jsx';
import Clear from './ClearButton.jsx';
import Save from './SaveButton.jsx';

const Track = (props) => {
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
      <Save pattern={pattern} bank={props.sound} slot={memoryNumber}>SAVE</Save>
      <Load bank={props.sound} slot={memoryNumber} updatePattern={updatePattern}>LOAD</Load>
      <input type="number" min="0" max="8" value={memoryNumber} onChange={(e) => changeSlot(e)}></input>
    </div>
  );
};

export default Track;
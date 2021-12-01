import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';

function Track(props) {
  // create 16 step array in state
  const [pattern, updatePattern] = useState(new Array(16).fill(false));
  
  function turnOn(id) {
    // console.log(pattern);
    pattern[id] ? pattern[id] = false : pattern[id] = true;
    // console.log(pattern);
    updatePattern([...pattern]);
  }

  const pads = [];
  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0) pads.push(
      <button 
        className={`pad4 ${pattern[i] ? 'active' : null}`} 
        key={`pad${i}`} 
        id={i} 
        onClick={() => turnOn(i)}
        />);
    else pads.push(
      <button 
        className={`pad ${pattern[i] ? 'active' : null}`} 
        key={`pad${i}`} 
        id={i} 
        onClick={() => turnOn(i)}
        />);
  }
  return (
    <div className="track">
      <button className="mute">{props.sound}</button>
      {pads}
      <button className="db">CLR</button>
      <button className="db">SAVE</button>
      <button className="db">LOAD</button>
      <input type="number" defaultValue="0"></input>
    </div>
  );
};

export default hot(module)(Track);
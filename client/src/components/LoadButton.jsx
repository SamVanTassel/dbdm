import React from 'react';

const Load= (props) => {
  // Helper function to convert data from string to array for react components
  function dataStringToArray(string) {
    const arr = string.split('')
    return arr.map((el) => {
      if (el === 'X') return true;
      if (el === '.') return false;
    });
  }
  

  const loadPattern = (bank, slot) => {
    fetch(`/memory/${bank}/${slot}`)
      .then(response => response.json())
      .then(res => {
        // Update state with parsed response data
        props.updatePattern(dataStringToArray(res.pattern));
        props.changeWords(props.trackIndex, res.name);
      })
      .catch(err => console.log(err));
  }

  return <button className="db" onClick={() => {loadPattern(props.bank, props.slot)}}>LOAD</button>
}

export default Load;
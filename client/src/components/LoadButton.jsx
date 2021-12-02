import React from 'react';

const Load= (props) => {
  // helper function to convert data from string to array for react components
  function dataStringToArray(string) {
    const arr = string.split('')
    console.log(arr);
    return arr.map((el) => {
      if (el === 'X') return true;
      if (el === '.') return false;
    });
  }
  

  const loadPattern = (bank, slot) => {
    fetch(`/api/memory/${bank}/${slot}`)
      .then(response => response.json())
      .then(res => {
        // update state with parsed response data
        props.updatePattern(dataStringToArray(res.pattern));
        if (res.name) props.changeWords(props.trackIndex, res.name)
        else props.changeWords(props.trackIndex, 'xxxx');
      })
      .catch(err => console.log(err));
  }

  return <button className="db" onClick={() => {loadPattern(props.bank, props.slot)}}>LOAD</button>
}

export default Load;
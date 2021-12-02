import React from 'react';

const Save = (props) => {
  // SEND PATTERN AS STRING OF X's (true) and .'s (false)
  const savePattern = (bank, slot, pattern) => {
    fetch(`/api/memory/${bank}/${slot}`, 
      { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 'pattern': pattern.join('').replace(/true/g, 'X').replace(/false/g, '.') }) 
      })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.name) props.changeWords(props.trackIndex, res.name)
        else props.changeWords(props.trackIndex, 'xxxx');
      })
      .catch(err => console.log(err));
  }

  return <button 
          className="db" 
          onClick={() => savePattern(props.bank, props.slot, props.pattern)}>
            SAVE
          </button>
}

export default Save;
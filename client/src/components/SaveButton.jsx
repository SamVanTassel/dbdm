import React from 'react';

const Save = (props) => {
  // Send pattern as string of X's (true) and .'s (false) for legibility and easy comparison
  const savePattern = (bank, slot, pattern) => {
    fetch(`/memory/${bank}/${slot}`, 
      { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          'pattern': pattern.join('').replace(/true/g, 'X').replace(/false/g, '.'),
          name: props.words[props.trackIndex]
        }) 
      })
      .then(response => response.json())
      .then(res => {
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
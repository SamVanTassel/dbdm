import React from 'react';

const Save = (props) => {

  const savePattern = (bank, slot, pattern) => {
    fetch(`/api/memory/${bank}/${slot}`, 
      { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 'pattern': pattern }) 
      })
      .then(response => response.json())
      .then(res => console.log(res.message))
      .catch(err => console.log(err));
  }

  return <button 
          className="db" 
          onClick={() => savePattern(props.bank, props.slot, props.pattern)}>
            SAVE
          </button>
}

export default Save;
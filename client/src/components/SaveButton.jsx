import React from 'react';
import { hot } from 'react-hot-loader';

function Save(props) {

  function save(pattern, slot) {
    fetch('/api/memory', 
      { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 'pattern': pattern, 'slot': slot }) 
      })
      .then(response => response.json())
      .then(res => console.log(res.message))
      .catch(err => console.log(err));
  }

  return <button className="db" onClick={() => save(props.pattern, props.slot)}>SAVE</button>
}

export default hot(module)(Save);
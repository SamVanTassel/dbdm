import React from 'react';

const Load= (props) => {

  const loadPattern = (bank, slot) => {
    fetch(`/api/memory/${bank}/${slot}`)
      .then(response => response.json())
      .then(res => {
        props.updatePattern(res.pattern)
      })
      .catch(err => console.log(err));
  }

  return <button className="db" onClick={() => {loadPattern(props.bank, props.slot)}}>LOAD</button>
}

export default Load;
import React from 'react';
import { hot } from 'react-hot-loader';

function Mute(props) {

  function myFunc() {
    fetch('/api/mute')
      .then((res) => res.json())
      .then((data) => window.alert(data.message))
  }

  return <button className="mute" onClick={() => myFunc()}>{props.sound}</button>
}

export default hot(module)(Mute);
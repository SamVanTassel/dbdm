import React from 'react';
import { hot } from 'react-hot-loader';

function Clear(props) {

  function clearPattern() {
    props.updatePattern(new Array(16).fill(false));
  }

  return <button 
           className="db" 
           onClick={() => clearPattern()}>
            CLR
          </button>
}

export default hot(module)(Clear);
import React from 'react';

const Clear = (props) => {

  function clearPattern() {
    props.updatePattern(new Array(16).fill(false));
  }

  return <button 
           className="db" 
           onClick={() => clearPattern()}>
            CLR
          </button>
}

export default Clear;
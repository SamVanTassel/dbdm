import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';

function Track() {
  // create buttons
  let i = 0;
  const pads = [];
  while (i < 16) {
    if (i % 4 === 0) pads.push(<button className="pad4">X</button>);
    else pads.push(<button className="pad">X</button>)
    i++;
  }
  return (
    <div class="track">{pads}</div>
  );
};

export default hot(module)(Track);
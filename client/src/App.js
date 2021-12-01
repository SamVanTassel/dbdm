import React, { useState, useEffect } from 'react';
import './App.css';
import TracksContainer from './components/TracksContainer.jsx';

const App = () => {

  useEffect(() => {
    document.title = `Ding Dang Application`;
  })

  return (
    <div id="main"> 
      <h1>DBDM</h1>
      <TracksContainer />
      <p>x x x x . x x x x . x x x x . x x x x</p>
    </div>
  );
}

export default App;
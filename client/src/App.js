import React, { useState, useEffect } from 'react';
import './App.css';
import TracksContainer from './components/TracksContainer.jsx';

const App = () => {
  const tracks = ['OH', 'CH', 'SD', 'BD'];

  const [words, changeWords] = useState(new Array(tracks.length).fill('xxxx'));
  
  useEffect(() => {
    document.title = `Ding Dang Application`;
  })
  
  const alterWords = (index, name) => {
    const newWords = [... words];
    if (!name) newWords[index] = 'xxxx';
    else newWords[index] = name;
    changeWords(newWords);
  }

  return (
    <div id="main"> 
      <h1>DBDM</h1>
      <TracksContainer tracks={tracks} words={words} changeWords={alterWords} />
      <p>{words.join(' . ')}</p>
    </div>
  );
}

export default App;
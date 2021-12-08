import React, { useState, useEffect } from 'react';
import './App.css';
import TracksContainer from './components/TracksContainer.jsx';


const App = () => {
  const [words, changeWords] = useState(new Array(4).fill('xxxx'));
  const [kit, changeKit] = useState('CR78')

  const urlStart = 'https://tonejs.github.io/audio/drum-samples/' + kit + '/';
  
  const tracks = [{ id: 'TM', mp3: `${urlStart}tom1.mp3` },
  { id: 'HH', mp3: `${urlStart}hihat.mp3` },
  { id: 'SD', mp3: `${urlStart}snare.mp3` },
  { id: 'KD', mp3: `${urlStart}kick.mp3` }];

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
      <select value ={kit} onChange={(e) => { changeKit(e.target.value); console.log(kit)}}>
        <option value="CR78">CR78</option>
        <option value="Bongos">Bongos</option>
        <option value="KPR77">KPR77</option>
        <option value="acoustic-kit">Acoustic</option>
        <option value="4OP-FM">FM</option>
        <option value="Stark">Stark</option>
        <option value="breakbeat13">Breakbeat</option>
        <option value="Kit3">Kit3</option>
      </select>
    </div>
  );
}

export default App;
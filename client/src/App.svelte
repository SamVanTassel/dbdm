<script lang='ts'>
  import * as Tone from 'tone';
  import TracksContainer from './components/TracksContainer.svelte';
  import Settings from './components/Settings.svelte';
  
  let step: number = -1;
  Tone.Transport.scheduleRepeat((time) => {
    step = (step + 1) % 16;
  }, '16n');

  let words: string[] = new Array(4).fill('xxxx');

  let kits = [
    {name: 'CR78', id: 'CR78'}, 
    {name: 'Acoustic', id: 'acoustic-kit'},
    {name: 'KPR77', id: 'KPR77'},
    {name: 'FM', id: '4OP-FM'},
    {name: 'Stark', id: 'Stark'},
    {name: 'Breakbeat', id: 'breakbeat13'},
    {name: 'Kitty', id: 'Kit3'},
    ]
  let kitIndex = 0;
  let hiddenUp = false;
  let hiddenDown = true;
  const nextKit = () => {
    let paused = false;
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
      paused = true;
    }
    if (kitIndex < kits.length - 1) {
      kitIndex += 1;
      hiddenDown = false;
    }
    if (kitIndex === kits.length - 1) {
      hiddenUp = true;
    }
    if (paused) Tone.Transport.start();
  }
  const prevKit =() => {
    let paused = false;
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
      paused = true;
    }
    if (kitIndex > 0) {
      kitIndex -= 1;
      hiddenUp = false;
    }
    if (kitIndex === 0) {
      hiddenDown = true;
    }
    if (paused) Tone.Transport.start();
  }
  $: selectedKit = kits[kitIndex];

  $: urlStart = `https://tonejs.github.io/audio/drum-samples/${selectedKit.id}/`;

  $: tracks = [
    { id: 'TM', mp3: `${urlStart}tom1.mp3` },
    { id: 'HH', mp3: `${urlStart}hihat.mp3` },
    { id: 'SD', mp3: `${urlStart}snare.mp3` },
    { id: 'KD', mp3: `${urlStart}kick.mp3` }
  ];

  $: document.title = `dbdm ${words.map((word) => word[0]).join('')}`;
  const changeWords = (index: number, name?: string) => {
    const newWords = [...words];
    if (!name) newWords[index] = 'xxxx';
    else newWords[index] = name;
    words = newWords;
  };

  $: settingsProps = {
    selectedKit,
    nextKit,
    prevKit,
    hiddenDown,
    hiddenUp
  }
</script>

<div id="main">
  <h1>DBDM</h1>
  <TracksContainer {step} {tracks} {words} {changeWords} />
  <p>{words.join(' . ')}</p>
  <Settings bind:step {...settingsProps} />
</div>

<style global>
  @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;0,700;1,700&display=swap');
  html {
    box-sizing: border-box;
    height: 100%;
  }
  body {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    font-family: 'Kanit', sans-serif;
    background: rgb(144,110,160);
    background: linear-gradient(180deg, rgb(129, 95, 145) 0%, rgba(144,110,160,1) 20%, rgba(144,110,160,1) 70%, rgb(129, 95, 145) 100%);
  }
  h1 {
    font-size: 6rem;
    margin: .5rem;
    padding: .25rem;
    text-shadow: 4px 4px rgb(129, 95, 145);
  }
  body:before {
    content: '';
    flex: 1;
  }
  body:after {
    flex: 2;
    content: '';
  }
  #root {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #main {
    width: 95%;
    background-color: rgb(144,110,160);
    color: wheat;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 25px;
    box-shadow: 2px 2px 4px rgb(129, 95, 145), -2px -2px 4px rgb(129, 95, 145);
    max-width: 1350px;
  }
</style>

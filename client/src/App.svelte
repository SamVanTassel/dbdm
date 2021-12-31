<script>
  import TracksContainer from './components/TracksContainer.svelte';
  
  let words = new Array(4).fill('xxxx');
  let selectedKit = 'CR78';

  $: urlStart = `https://tonejs.github.io/audio/drum-samples/${selectedKit}/`;

  $: tracks = [
    { id: 'TM', mp3: `${urlStart}tom1.mp3` },
    { id: 'HH', mp3: `${urlStart}hihat.mp3` },
    { id: 'SD', mp3: `${urlStart}snare.mp3` },
    { id: 'KD', mp3: `${urlStart}kick.mp3` }
  ];

  let kits = [
    {name: 'CR78', id: 'CR78'}, 
    {name: 'Acoustic', id: 'acoustic-kit'},
    {name: 'KPR77', id: 'KPR77'},
    {name: 'FM', id: '4OP-FM'},
    {name: 'Stark', id: 'Stark'},
    {name: 'Breakbeat', id: 'breakbeat13'},
    {name: 'Whatever', id: 'Kit3'},
    ]

  $: document.title = `dbdm ${words.map((word) => word[0]).join('')}`;
  const changeWords = (index, name) => {
    const newWords = [...words];
    if (!name) newWords[index] = 'xxxx';
    else newWords[index] = name;
    words = newWords;
  };

</script>

<div id="main">
  <h1>DBDM</h1>
  <TracksContainer {tracks} {words} {changeWords} />
  <p>{words.join(' . ')}</p>
  <select bind:value={selectedKit}>
    {#each kits as kit}
      <option value={kit.id}>
        {kit.name}
      </option>
    {/each}
  </select>
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

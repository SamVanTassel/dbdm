<script lang='ts'>
  import * as Tone from 'tone';
  import TracksContainer from '../../lib/TracksContainer.svelte';
  import Settings from '../../lib/Settings.svelte';
  import { onMount } from 'svelte';
  import { toneData } from '$lib/utils/globalData'

  let step: number = -1;
  let loaded: boolean = false;

  toneData.subscribe(data => {
    step = data.step;
    loaded = data.loaded;
  });

  let words: string[] = new Array(4).fill('xxxx');
  onMount(async () => {
    document.title = `dbdm ${words.map((word) => word[0]).join('')}`;
  });

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
  {#if loaded} 
  <Settings bind:step {...settingsProps} />
  {/if}
</div>

<h3>{step}</h3>

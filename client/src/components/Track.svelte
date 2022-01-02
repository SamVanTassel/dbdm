<script>
  import * as Tone from 'tone';
  import Mute from './Mute.svelte';
  import Clear from './Clear.svelte';
  import Save from './Save.svelte';
  import Load from './Load.svelte';
  import Selectors from './Selectors.svelte';
  
  export let step;
  export let mp3;
  export let index;
  export let bank;
  export let words;
  export let changeWords;

  let pattern = new Array(16).fill(false);
  let slot = 1;

  function toggleNote(id) {
    pattern[id] ? pattern[id] = false : pattern[id] = true;
  }
  const changePattern = (newPattern) => {
    pattern = newPattern;
  }
  let hiddenUp = false;
  let hiddenDown = true;
  const increment = () => {
    if (slot < 8) {
      slot += 1;
      hiddenDown = false;
    }
    if (slot === 8) hiddenUp = true;
  }
  const decrement = () => {
    if (slot > 1) {
      slot -= 1;
      hiddenUp = false;
    }
    if (slot === 1) hiddenDown = true;
  }

  $: saveLoadProps = {
    changeWords,
    slot,
    words,
    trackIndex: index,
    bank,
  }
  let channel = new Tone.Channel();
  $: player = new Tone.Player(mp3).connect(channel);
  $: pattern.forEach((note, i) => {
    if (note && step === i) {
      if (player.loaded) player.start();
    }
  })
  channel.toDestination();
</script>

<div class="track">
  <Mute {channel} {bank} />
  {#each pattern as note, i }
    <button
      class={`${i % 4 === 0 ? 'pad4' : 'pad'} ${pattern[i] ? 'active' : null} ${i === step ? 'on' : ''} trackButton`}
      on:click={() => toggleNote(i)} 
      id={i}>
    </button>
  {/each}
  <Clear {changePattern} />
  <Save {...saveLoadProps} {pattern} />
  <Load {...saveLoadProps} {changePattern} />
  <div class="slotDisplay">
    <div class="slotNum">{slot}</div>
    <Selectors {hiddenUp} {hiddenDown} up={increment} down={decrement}/>
  </div>
</div>

<style>
  .track {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
  }

  :global(button) {
    height: 50px;
    width: 50px;
    border-radius: 4px;
    margin: 2px;
    box-shadow: 2px 2px wheat;
  }

  .pad, 
  .pad4 {
    min-width: 25px;
    max-width: 50px;
    flex-basis: 100%;
    border-style: none;
    background-color:rgb(150, 99, 163);
    color: wheat;
  }

  .pad4 {
    background-color:rgb(140, 90, 155);
  }

  .on {
    border: 2px wheat solid;
  }
  
  :global(.db,
  .mute) {
    font-size: .75rem;
    font-style: italic;
    border: 1px solid rgb(243, 220, 179, .25);
    background-color:rgb(144, 110, 160);
    color: rgba(255, 237, 203, 0.616);
    box-shadow: 2px 2px rgba(245, 222, 179, 0.767);
  }

  :global(.mute:hover,
  .db:hover,
  .pad:hover,
  .pad4:hover) {
    box-shadow: 1px 1px;
    /* padding-top: 3px;
    padding-left: 3px; */
  }

  .pad:active,
  .pad4:active,
  .active {
    box-shadow: 1px 1px;
    background-color: wheat;
    color:rgb(150, 99, 163);
  }

  .slotDisplay {
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: 50px;
    min-width: 35px;
    background-color:rgb(144, 110, 160);
    border: 1px solid rgb(243, 220, 179, .25);
    border-radius: 4px;
    box-shadow: 2px 2px rgba(245, 222, 179, 0.767);
    margin: 2px;
    color: wheat;
    text-align: center;
    font-size: .9rem;
  }
  .slotNum {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
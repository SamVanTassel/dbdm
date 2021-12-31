<script>
  import Mute from './Mute.svelte';
  import Clear from './Clear.svelte';
  import Save from './Save.svelte';
  import Load from './Load.svelte';

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

  $: saveLoadProps = {
    changeWords,
    slot,
    words,
    trackIndex: index,
    bank,
  }
</script>

<div class="track">
  <Mute {bank} {mp3} />
  {#each pattern as note, i }
    <button
      class={`${i % 4 === 0 ? 'pad4' : 'pad'} ${pattern[i] ? 'active' : null} trackButton`}
      on:click={() => toggleNote(i)} 
      id={i}>
    </button>
  {/each}
  <Clear {changePattern} />
  <Save {...saveLoadProps} {pattern} />
  <Load {...saveLoadProps} {changePattern} />
  <input type=number bind:value={slot} min=1 max=8>
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

  input {
    background: transparent;
    border: 1px solid rgb(243, 220, 179, .5);
    border-radius: 4px;
    margin: 2px;
    color: wheat;
    width: 42px;
    text-align: center;
  }
</style>
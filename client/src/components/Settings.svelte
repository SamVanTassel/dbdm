<script>
  import * as Tone from 'tone';
  import Selectors from './Selectors.svelte';

  export let selectedKit;
  export let nextKit;
  export let prevKit;
  export let hiddenDown;
  export let hiddenUp;
  export let step;

</script>
<div class="settings">
  <div class="kitSelection">
  <div class ="kitDisplay"><div>Kit: </div><div>{selectedKit.name}</div></div>
    <Selectors up={nextKit} down={prevKit} {hiddenUp} {hiddenDown} />
  </div>
    <button on:click|once={() => Tone.start()} on:click={() => {step = 0; Tone.Transport.start()}}>▷</button>
    <button on:click={() => {Tone.Transport.stop(); step = -1}}>☐</button>
    <p>  Tempo:  {Math.floor(Tone.Transport.bpm.value)}</p>
    <input type="range" min="60" max="200" name="bpm" bind:value={Tone.Transport.bpm.value} step="5">
</div>
<style>
  /* TO DO: style slider, create container style and make components consistent w/ each other */
  .settings {
    display: flex;
  }
  .kitSelection {
    width: 150px;
    display: grid;
    grid-template-columns: 4fr 1fr;
    border-radius: 4px;
    padding-left: 10px;
    margin: 5px;
    border: 1px solid rgb(243, 220, 179, .75);
    box-shadow: 2px 2px rgba(245, 222, 179, 0.767);
  }
  .kitDisplay {
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 5px;
  }
   button {
    font-size: 1.25rem;
    border: 1px solid rgb(243, 220, 179, .25);
    color:rgb(150, 99, 163);
    background-color: rgba(255, 237, 203);
    box-shadow: 2px 2px rgba(245, 222, 179, 0.767);
  }

  button:hover {
    box-shadow: 1px 1px;
    /* padding-top: 3px;
    padding-left: 3px; */
  }
</style>
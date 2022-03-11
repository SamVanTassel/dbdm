<script lang='ts'>
  import * as Tone from 'tone';
  import Selectors from '../utils/Selectors.svelte';

  export let selectedKit;
  export let nextKit;
  export let prevKit;
  export let hiddenDown: boolean;
  export let hiddenUp: boolean;
  export let step: number;
</script>

<div class="settings">
  <div class="kitSelection">
  <div class ="kitDisplay"><div>Kit: </div><div>{selectedKit.name}</div></div>
    <Selectors up={nextKit} down={prevKit} {hiddenUp} {hiddenDown} />
  </div>
  <div class="playPause">
    <button on:click|once={() => Tone.start()} on:click={() => {step = 0; Tone.Transport.start()}}>▷</button>
    <button on:click={() => {Tone.Transport.stop(); step = -1}}>☐</button>
  </div>
  <div class="tempo">
    <p>  Tempo:  {Math.floor(Tone.Transport.bpm.value)}</p>
    <div class="slideContainer">
      <input type="range" min="60" max="200" name="bpm" class="slider" bind:value={Tone.Transport.bpm.value} step="5">
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles.scss";
  .settings {
    display: flex;
    width: 80%;
    justify-content: space-around;
    box-shadow: 1px 1px 2px $background-dark, -1px -1px 2px $background-dark;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    padding: 1rem;
    align-items: center;
  }
  .kitSelection {
    width: 150px;
    display: grid;
    grid-template-columns: 4fr 1fr;
    border-radius: 4px;
    padding-left: 10px;
    margin: 5px;
    border: 1px solid $wheat-border-light;
    box-shadow: 2px 2px $wheat-box-shadow-light;
  }
  .kitDisplay {
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 5px;
  }
  .playPause {
    display: flex;
  }
  .tempo {
    display: flex;
  }
  .slideContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 25px;
    background: $wheat-button-background;
    outline: none;
    opacity: .8;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 4px;
  }
  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    background: $pad-background;
  }
   button {
    font-size: 1.25rem;
    border: 1px solid $wheat-border-very-light;
    color: $pad-background;
    background-color: $wheat-button-background;
    box-shadow: 2px 2px $wheat-box-shadow-light;
  }

  button:hover {
    box-shadow: 1px 1px;
  }

  p {
    min-width: fit-content;
    margin-right: 1rem;
    text-align: center;
  }
</style>
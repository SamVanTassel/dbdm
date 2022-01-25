<script lang='ts'>
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
<style>
  .settings {
    display: flex;
    width: 80%;
    justify-content: space-around;
    /* border: wheat 1px solid; */
    box-shadow: 1px 1px 2px rgb(129, 95, 145), -1px -1px 2px rgb(129, 95, 145);
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
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 25px; /* Specified height */
    background: rgba(255, 237, 203); /* Grey background */
    outline: none; /* Remove outline */
    opacity: .8; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    border-radius: 4px;
  }
  .slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    border-radius: 4px;
    background: rgb(150, 99, 163); /* Green background */
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
  p {
    min-width: fit-content;
    margin-right: 1rem;
    text-align: center;
  }
</style>
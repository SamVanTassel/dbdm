<script lang="ts">
  import { toneData } from '$lib/utils/globalData'
  import Settings from '$lib/Settings.svelte'
  import { TonalStep } from '../../../../../Classes.js';

  let step: number = -1;
  let loaded: boolean = false;

  const playbackStyles: string[] = ['standard', 'reverse', 'top-to-bottom', 'bottom-to-top', 'snake', 'random'];
  let playbackStyleIndex = 0;
  let snakeIn = true; // flag for snake pattern
  
  toneData.subscribe(data => {
    step = data.step;
    loaded = data.loaded;
  });
  $: funkyStep = step;

  $: switch (playbackStyles[playbackStyleIndex]) {
    case 'reverse':
      funkyStep = 15 - step;
      break;
    case 'top-to-bottom':
      funkyStep = (step * 4) % 16 + Math.floor(step / 4);
      break;
    case 'bottom-to-top':
      funkyStep = 15 - ((step * 4) % 16 + Math.floor(step / 4));
      break;
    case 'snake': 
      if (snakeIn) {
        if (step < 4) funkyStep = step;
        else if (step === 4) funkyStep = 7;
        else if (step === 5) funkyStep = 11;
        else if (step === 6) funkyStep = 15;
        else if (step === 7) funkyStep = 14;
        else if (step === 8) funkyStep = 13;
        else if (step === 9) funkyStep = 12;
        else if (step === 10) funkyStep = 8;
        else if (step === 11) funkyStep = 4;
        else if (step === 12) funkyStep = 5;
        else if (step === 13) funkyStep = 6;
        else if (step === 14) funkyStep = 10;
        else if (step === 15) {
          funkyStep = 9;
          snakeIn = false;
        }
      } else {
        if (step === 0) funkyStep = 5;
        else if (step === 1) funkyStep = 6;
        else if (step === 2) funkyStep = 10;
        else if (step === 3) funkyStep = 9;
        else if (step === 4) funkyStep = 8;
        else if (step === 5) funkyStep = 4;
        else if (step === 6) funkyStep = 0;
        else if (step === 7) funkyStep = 1;
        else if (step === 8) funkyStep = 2;
        else if (step === 9) funkyStep = 3;
        else if (step === 10) funkyStep = 7;
        else if (step === 11) funkyStep = 11;
        else if (step === 12) funkyStep = 15;
        else if (step === 13) funkyStep = 14;
        else if (step === 14) funkyStep = 13;
        else if (step === 15) {
          funkyStep = 12;
          snakeIn = true;
        }
      }
      break;
    case 'random':
      funkyStep = Math.floor(Math.random() * 16);
      break;
    case 'standard':
      funkyStep = step;
      break;
  }

  const tonalSteps = new Array(16).fill('').map(el => new TonalStep());

  $: tonalSteps.forEach((tonalStep, i) => {
    if (tonalStep.note && funkyStep === i) {
    }
  })

  const switchPlayback = () => {
    playbackStyleIndex = (playbackStyleIndex + 1) % playbackStyles.length;
  }

</script>

<h2>temp</h2>
<button class="playbackSwap" on:click={switchPlayback}>Funk it up</button>
{playbackStyles[playbackStyleIndex]}
<main class="grid">
  {#each tonalSteps as tonalStep, i}
    <button class={`bigButton ${i === funkyStep ? 'on' : ''}`}>{tonalStep.note}</button>
  {/each}
</main>

<style lang="scss">
  main {
    height: 500px;
    width: 500px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .bigButton {
    appearance: none;
    width: 100px;
    height: 100px;
    margin: 10px;
    background-color: rgb(201, 110, 77);
    border-radius: 5px;
    color:rgb(240, 179, 99)
  }
  .on {
      background-color: rgb(240, 179, 99);
      color:rgb(201, 110, 77)
    }
  .playbackSwap {
    width: 100px;
    height: 25px;
  }
</style>
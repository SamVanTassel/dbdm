<script lang="ts">
  import { toneData } from '$lib/utils/globalData'
  import Settings from '$lib/Settings.svelte'
  import { TonalStep } from '../../../../../Classes.js';

  let step: number = -1;
  let loaded: boolean = false;

  const playbackStyles: string[] = ['standard', 'reverse']
  let playbackStyleIndex = 0;
  
  toneData.subscribe(data => {
    step = data.step;
    loaded = data.loaded;
  });
  $: funkyStep = step;

  $: switch (playbackStyles[playbackStyleIndex]) {
    case 'reverse':
      funkyStep = 15 - step;
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
<button on:click={switchPlayback}>Reverse</button>
<main class="grid">
  {#each tonalSteps as tonalStep, i}
    <button class={`bigButton ${i === funkyStep ? 'on' : ''}`}>{tonalStep.note}</button>
  {/each}
</main>
<!-- {#if loaded} 
    <Settings bind:step />
  {/if} -->

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
</style>
<script lang="ts">
  import { toneData } from '$lib/utils/globalData'
  import Settings from '$lib/Settings.svelte'
  import { TonalStep } from '../../../../../Classes.js';

  let step: Number = -1;
  let loaded: boolean = false;

  toneData.subscribe(data => {
    step = data.step;
    loaded = data.loaded;
  });

  const tonalSteps = new Array(16).fill('').map(el => new TonalStep());

  $: tonalSteps.forEach((tonalStep, i) => {
    if (tonalStep.note && step === i) {
      // console.log(i)
    }
  })

</script>

  <h1>temp</h1>

<main class="grid">
  {#each tonalSteps as tonalStep, i}
    <button class={`bigButton ${i === step ? 'on' : ''}`}>{tonalStep.note}</button>
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
  }
  .on {
      background-color: rgb(240, 179, 99);
    }
</style>
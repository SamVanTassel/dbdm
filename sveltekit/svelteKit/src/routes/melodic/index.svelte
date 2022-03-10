<script lang="ts">
  import { toneData } from '$lib/utils/globalData'

  let step: Number = -1;
  let loaded: boolean = false;

  toneData.subscribe(data => {
    step = data.step;
    loaded = data.loaded;
  });

const blocks = new Array(16).fill('X');
</script>

{#if loaded}
<h1>New Page</h1>
{step}
{/if}

<main class="grid">
  {#each blocks as block}
  <button class="bigButton">{block}</button>
  {/each}
</main>

<h3>{step}</h3>

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
</style>
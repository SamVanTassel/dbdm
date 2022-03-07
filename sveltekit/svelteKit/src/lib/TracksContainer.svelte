<script lang='ts'>
  import Track from './Track.svelte';
  
  export let step: number;
  export let words: string[];
  export let tracks;
  export let changeWords;
</script>

<div id="tracksContainer">
  {#each tracks as track, index} 
    <Track {step} mp3={track.mp3} bank={track.id} {index} {words} {changeWords}/>
  {/each}
</div>

<style>
  #tracksContainer {
    display: flex;
    flex-direction: column;
    width: 95%;
  }
</style>
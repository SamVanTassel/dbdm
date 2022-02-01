<script lang='ts'>
  export let bank;
  export let toggleMute;
  let muted = false;
</script>

<button class={`mute ${muted ? 'muted' : ''}`} 
  on:click={() => { muted = !muted; toggleMute() }} 
>{bank}</button>

<style lang="scss">
  @import "../styles.scss";
  .muted {
      background-color: $mute-button-on !important;
    }
</style>
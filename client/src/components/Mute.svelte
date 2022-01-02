<script>
  export let bank;
  export let channel;
</script>

<button class="mute" on:click={() => {channel.mute = !channel.mute}}>{bank}</button>
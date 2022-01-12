<script>
  export let bank;
  export let channel;
</script>

<button class="mute" on:click={() => {channel.mute = !channel.mute}}>{bank}</button>

<!-- To do: add style to pressed mute button and style track when mute is on-->
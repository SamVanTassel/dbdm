<script>
  import * as Tone from 'tone';

  export let mp3;
  export let bank;

  $: player = new Tone.Player(mp3).toDestination();
</script>

<button class="mute" on:click={() => player.start() }>{bank}</button>
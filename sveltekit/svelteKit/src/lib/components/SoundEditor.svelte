<script>
import { onMount } from "svelte";
import { MonoSynth } from 'tone';
import { instruments } from './../utils/globalData.js'

export let instrument;
  
onMount(() => {
  instruments.set({synth: new MonoSynth(
    {oscillator: {
      type: 'sawtooth'
    },
    envelope: {
      decay: .05,
      sustain: .8,
      release: .15
    }
}).toDestination()})
})
</script>

<div>
  {#if instrument !== null}
  {instrument}
  {/if}
</div>
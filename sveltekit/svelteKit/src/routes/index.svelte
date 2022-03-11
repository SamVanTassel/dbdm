<script lang='ts'>
  import { onMount } from 'svelte';
  import { toneData, instruments } from '$lib/utils/globalData';
  import * as Tone from 'tone';
  import SoundEditor from '../lib/SoundEditor.svelte'
  
  let synth: any;
  let step: Number = -1;
  let loaded: boolean = false;

	onMount(() => {
    toneData.subscribe(data => {
      step = data.step;
      loaded = data.loaded;
    });
    instruments.subscribe(data => {
      synth = data.synth;
    })

    Tone.Transport.scheduleRepeat(() => {
      toneData.update(data => { 
        return {
          step: (data.step + 1) % 16,
          loaded: true
        }
    })
    }, '16n');
    Tone.start();
  });

  const playPause = () => {
    if (Tone.Transport.state === 'started') {
      Tone.Transport.stop();
    } else {
      Tone.Transport.start();
    }
  }
</script>

<button 
  on:click|once={() => Tone.start()} 
  on:click={playPause}
>Start?</button>
<h3>{step}</h3>
<h2>Instruments</h2>
{#if loaded}
  <SoundEditor instrument={synth}></SoundEditor>
{/if}
<style lang="scss">

</style>

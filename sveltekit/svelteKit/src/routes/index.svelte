<script lang='ts'>
  import { onMount, setContext } from 'svelte';
  import { toneData } from '$lib/utils/globalData';

  import * as Svelte from 'svelte';
  import * as Tone from 'tone';
  import SoundEditor from '../lib/SoundEditor.svelte'
  
  let synth: any;
  let step: Number = -1;
  let loaded: boolean = false;

  toneData.subscribe(data => {
    step = data.step;
    loaded = data.loaded;
  });

	onMount(() => {
    Tone.Transport.scheduleRepeat(() => {
      toneData.update(data => { 
        return {
          step: (data.step + 1) % 16,
          loaded: true
        }
    })
    }, '16n');
    Tone.start();
    synth = new Tone.MonoSynth();
  });
  
  // setContext('step', step);
  // setContext('loaded', loaded);

  console.log(Svelte.hasContext('loaded'));

  const playPause = () => {
    console.log(Tone.Transport)
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

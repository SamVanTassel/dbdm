<script lang="ts">
  import Mute from './buttons/Mute.svelte';
  import Clear from './buttons/Clear.svelte';
  import Save from './buttons/Save.svelte';
  import Load from './buttons/Load.svelte';
  import Selectors from './utils/Selectors.svelte';
  import { Step } from '../../../../Classes.js';
import { onMount } from 'svelte';
  
  export let step: number;
  export let mp3: string;
  export let index: number;
  export let bank: string;
  export let words: string[];
  export let changeWords;
  
  let pattern: Step[] = new Array(16).fill('.').map((el) => new Step(false));
  let slotNum: number = 1;

  function toggleNote(id: number) {
    const note = pattern[id];
    note.isOn = !note.isOn;
    pattern = [...pattern];
    console.log(pattern.map(el => el.isOn))
  }
  const changePattern = (newPattern: typeof pattern) => {
    pattern = newPattern;
  }
  let hiddenUp: boolean = false;
  let hiddenDown: boolean = true;
  const increment = () => {
    if (slotNum < 8) {
      slotNum += 1;
      hiddenDown = false;
    }
    if (slotNum === 8) hiddenUp = true;
  }
  const decrement = () => {
    if (slotNum > 1) {
      slotNum -= 1;
      hiddenUp = false;
    }
    if (slotNum === 1) hiddenDown = true;
  }

  $: saveLoadProps = {
    changeWords,
    slotNum,
    trackIndex: index,
    bank,
  }
  let Tone;
  let channel;
  let player;
  onMount(async () => {
    Tone = await import('tone');
    channel = new Tone.Channel();
    player = new Tone.Player(mp3).connect(channel);
    channel.toDestination();
  })
  
  $: pattern.forEach((note, i) => {
    if (note.isOn && step === i) {
      if (player.loaded) player.start();
    }
  })

  let isMuted = false;
  $: toggleMute = () => { 
    isMuted = !isMuted;
    channel.mute = !channel.mute;
  }

</script>

<div class="track">
  <Mute {bank} {toggleMute}/>
  {#each pattern as note, i }
    <button
      class={`
        ${i % 4 === 0 ? 'pad4' : 'pad'} 
        ${pattern[i].isOn ? 'active' : null} 
        ${i === step ? 'on' : ''} trackButton
        ${isMuted ? 'muted' : ''}
        `}
      on:click={() => toggleNote(i)} 
      id="button{i}">
    </button>
  {/each}
  <Clear {changePattern} />
  <Save {...saveLoadProps} {words} {pattern} />
  <Load {...saveLoadProps} {changePattern} />
  <div class="slotDisplay">
    <div class="slotNum">{slotNum}</div>
    <Selectors {hiddenUp} {hiddenDown} up={increment} down={decrement}/>
  </div>
</div>

<style lang="scss">
  @import "../styles.scss";
  .track {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
  }

  :global(button) {
    height: 50px;
    width: 50px;
    border-radius: 4px;
    margin: 2px;
    box-shadow: 2px 2px $wheat-main;
  }

  .pad, 
  .pad4 {
    min-width: 25px;
    max-width: 50px;
    flex-basis: 100%;
    border-style: none;
    background-color: $pad-background;
    color: $wheat-main;
  }

  .pad4 {
    background-color:$pad4-background;
  }

  .on {
    border: 2px $wheat-main solid;
  }
  
  :global(.db,
  .mute) {
    font-size: .75rem;
    font-style: italic;
    border: 1px solid $wheat-border-very-light;
    background-color:$background-main;
    color: $button-text-wheat;
    box-shadow: 2px 2px $wheat-box-shadow-light;
  }

  :global(.mute:hover,
  .db:hover,
  .pad:hover,
  .pad4:hover) {
    box-shadow: 1px 1px;
    /* padding-top: 3px;
    padding-left: 3px; */
  }

  .pad:active,
  .pad4:active,
  .active {
    box-shadow: 1px 1px;
    background-color: $wheat-main;
  }

  :global(.muted) {
    &.pad {
      background-color: $pad-muted !important;
    }
    &.pad4 {
      background-color: $pad4-muted !important;
    }
    &.active {
      background-color: $active-muted !important;
    }
  }

  .slotDisplay {
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: 50px;
    min-width: 35px;
    background-color:$background-main;
    border: 1px solid $wheat-border-very-light;
    border-radius: 4px;
    box-shadow: 2px 2px $wheat-box-shadow-light;
    margin: 2px;
    color: $wheat-main;
    text-align: center;
    font-size: .9rem;
  }
  .slotNum {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
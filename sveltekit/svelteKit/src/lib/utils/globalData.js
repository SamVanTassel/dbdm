import { writable } from 'svelte/store'
import { MonoSynth } from 'tone'

const toneData = writable(
  {
    step: -1,
    loaded: false
})

const instruments = writable(
  {
    synth: new MonoSynth()
  }
)

export { toneData, instruments }
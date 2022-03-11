import { writable } from 'svelte/store'

const toneData = writable(
  {
    step: -1,
    loaded: false
})

const instruments = writable(
  {
    synth: null
  }
)

export { toneData, instruments }
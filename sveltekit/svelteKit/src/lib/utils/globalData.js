import { writable } from 'svelte/store'

const toneData = writable(
  {
    step: -1,
    loaded: false
})

export { toneData }
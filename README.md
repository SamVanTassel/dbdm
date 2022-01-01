# DBDM

DBDM is a simple 4-track drum machine whose patterns are stored on a database.

It stores up to thirty-two 16-step patterns, 8 per track. As patterns are saved each one is assigned a unique name. As a pattern is saved to a track, that pattern's name is displayed below your track. The names of your tracks combine to create a four-word identifier for your track.

## Tone.js

DBDM plays back patterns in a simple repeating loop of 16 steps, with choices of a few different drum kit sounds. This playback is enabled by Tone.js, whose transport feature provides a consistent tracking source for which step the drum machine is on throughout the app.

### Audio

Audio samples for drums can be found here : https://github.com/Tonejs/audio/tree/master/drum-samples

They can be accessed in this format: https://tonejs.github.io/audio/drum-samples/CR78/kick.mp3

## Further Development

Universal controls: tempo, swing, effects.
Per-step controls: velocity, ratchet, probability
Expanded capabilities: Melodic sequencer in addition to drums

## Known Issues

Changing the kit while drum machine is playing causes a buffer error. Possibly due to async call to get mp3 source for drum sounds, needs more investigation.
# DBDM

DBDM is a simple 4-track drum machine whose patterns are stored on a database.

It stores up to thirty-two 16-step patterns, 8 per track. As patterns are saved each one is assigned a unique name. As a pattern is saved to a track, that pattern's name is displayed below your track. The names of your tracks combine to create a four-word identifier for your track.

## Tone.js

Currently, DBDM only writes and displays patterns and does not play them back. Pressing what would be the mute button in a standard sequencer playes that drum's sound. Implementing features from the tone.js library to turn the pattern display into a working drum machine is the next goal for this project.

### Audio

Audio samples for drums can be found here : https://github.com/Tonejs/audio/tree/master/drum-samples

They can be accessed in this format: https://tonejs.github.io/audio/drum-samples/CR78/kick.mp3
import * as Tone from 'tone';

// press any button to activate audio
document.addEventListener('onkeydown', async () => {
	await Tone.start()
	console.log('audio is ready')
})

const pads = document.getElementsByClassName('.pad');
for (let pad of pads) {
  pad.addEventListener('click', () => {
    pad.classList.add('active');
  });
}
// pad.addEventListener('click', () => {
//   pad.classList.toggle('active');
// });

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

const mute = document.querySelector('.mute');
mute.addEventListener('click', () => {
  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease("C4", "8n");
});

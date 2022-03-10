export class Step {
    constructor(isOn = false, volume = 128, ratchet = 1) {
      this.isOn = isOn;
      this.volume = volume;
      this.ratchet = ratchet;
    }
  }

export class TonalStep {
  constructor(note = 'C4') {
    this.note = note;
  }
}
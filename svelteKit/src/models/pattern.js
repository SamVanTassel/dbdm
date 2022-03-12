import mongoose from 'mongoose';

const StepSchema = new mongoose.Schema({
  isOn: {
    type: Boolean,
    required: true
  },
  volume: Number,
  ratchet: Number
})

// define pattern schema
const PatternSchema = new mongoose.Schema({
  pattern: { 
    type: Array, 
    items: StepSchema,
    maxItems: 16,
    minItems: 16
  },
  slot: { 
    type: Number, 
    min: [1, 'slot must be greater than 0'], 
    max: [8, 'there are only 8 slots available'], 
    required: true,
    unique: false
  },
  bank: { type: String, required: true },
  name: String
})

// export model compiled from schema
export default mongoose.models.Pattern || mongoose.model('Pattern', PatternSchema);


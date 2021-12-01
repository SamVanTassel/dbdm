import mongoose from 'mongoose';
const { Schema } = mongoose;

// define pattern schema
const patternSchema = new Schema({
  pattern: { type: [], required: true },
  slot: { 
    type: Number, 
    min: [1, 'slot must be greater than 0'], 
    max: [8, 'there are only 8 slots available'], 
    required: true 
  },
  name: String
})

// export model compiled from schema
export default mongoose.model('Pattern', patternSchema)


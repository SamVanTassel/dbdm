import mongoose from 'mongoose';
const { schema } = mongoose;

const bankSchema = new schema({
  pattern: { type: Array, required: true },
  slot = { type: Number, required: true }
})

const Bank = mongoose.model('Bank', bankSchema);


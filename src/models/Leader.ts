import { Schema, model } from 'mongoose';

const leaderSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  votes: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Leader = model('Leader', leaderSchema);

export default Leader;

import { Schema, model } from 'mongoose';

const priorityVoteSchema = new Schema({
  priority: { type: String, required: true, unique: true },
  votes: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const PriorityVote = model('PriorityVote', priorityVoteSchema);

export default PriorityVote;

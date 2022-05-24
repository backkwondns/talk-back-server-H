import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const talk = new Schema({
  from: String,
  content: String,
  timeStamp: { type: Date, default: Date.now },
});

const talksSchema = new Schema(
  {
    userName: Array,
    talk: [talk],
    lastContent: String,
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const Talks = mongoose.model('Talk', talksSchema);
export default Talks;

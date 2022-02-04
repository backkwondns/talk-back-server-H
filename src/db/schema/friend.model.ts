import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const friendSchema = new Schema(
  {
    userName: String,
    friends: Array,
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const Friend = mongoose.model('Friend', friendSchema);
export default Friend;

import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const accountSchema = new Schema(
  {
    userName: String,
    password: String,
    email: String,
    phoneNumber: String,
    tokenVersion: Number,
    setting: Object,
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const Account = mongoose.model('Account', accountSchema);
export default Account;

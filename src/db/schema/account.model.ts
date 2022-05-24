import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const setting = new Schema({
  avatar: String,
  statusMessage: String,
  mode: String,
});

const accountSchema = new Schema(
  {
    userName: String,
    password: String,
    email: String,
    phoneNumber: String,
    tokenVersion: { type: Number, default: 0 },
    setting: {
      type: setting,
      default: {
        avatar: '',
        statusMessage: '',
        mode: 'light',
      },
    },
    talksList: { type: [String], default: [] },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const Account = mongoose.model('Account', accountSchema);
export default Account;

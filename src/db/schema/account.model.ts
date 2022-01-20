import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const accountSchema = new Schema(
  {
    userName: String,
    password: String,
    email: String,
    phoneNumber: String,
    tokenVersion: Number,
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  },
);

export const Account = mongoose.model('Account', accountSchema);

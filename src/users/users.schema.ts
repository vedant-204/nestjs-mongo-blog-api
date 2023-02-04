import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
})

export interface User extends mongoose.Document {
  _id: string;
  username: string,
  password: string
}


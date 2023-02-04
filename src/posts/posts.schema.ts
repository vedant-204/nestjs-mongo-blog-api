import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
    unique: true,
  },
  createdOn: {
    type: Date,
    required: true
  }
})

export interface Posts extends mongoose.Document {
  title: string,
  description: string,
  createdBy: string,
  createdOn: string
}

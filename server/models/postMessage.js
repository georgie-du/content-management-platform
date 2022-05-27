import mongoose from "mongoose";

const Schema = mongoose.Schema;
//define schema
const postSchema = new Schema(
  {
    title: String,
    message: String,
    name: String,
    author: String,
    tags: [String],
    fileSelected: String,
    likes: {
      type: [String],
      default: [],
    }, 
    comments: { type: [String], default: [] },
    createdAt: {
      type: Date,
      dafault: new Date(),
    },
  },
  { timestamps: true }
);

// compile model from schema
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;

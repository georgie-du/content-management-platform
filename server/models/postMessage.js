import mongoose from "mongoose";

//define schema
const postSchema = new mongoose.Schema(
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
      default: new Date(),
    },
  },
  { timestamps: true }
);

// compile model from schema
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;

import mongoose from "mongoose";

//define schema
const postSchema = mongoose.Schema(
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

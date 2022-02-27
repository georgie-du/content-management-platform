import mongoose from "mongoose";

//define schema
const postSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
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

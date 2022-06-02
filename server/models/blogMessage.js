import mongoose from "mongoose";

//define schema
const blogSchema = new mongoose.Schema(
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
const BlogMessage = mongoose.model("BlogMessage", blogSchema);

export default BlogMessage;

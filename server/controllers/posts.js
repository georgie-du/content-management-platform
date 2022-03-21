import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// get list of posts
export async function getBlogs(req, res) {
  try {
    const postMessages = await PostMessage.find().sort({ createdAt: -1 });

    console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// add a new post to the db 
export async function createBlog(req, res) {
  const newBlog = new PostMessage(req.body);
  console.log(newBlog)

  try {
    await newBlog.save();
    res.status(201).json(newBlog);
    // redirect?
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


export async function updateBlog(req, res) {
  const { id: user_id } = req.params;
  const post = req.body;

  // check if id is an mongoose object id
  if (!mongoose.Types.ObjectId.isValid(user_id)) return res.status(404).send(`Blog with id ${user_id} not found!`);

  const updatedBlog = await PostMessage.findByIdAndUpdate(user_id, { ...post, user_id }, { new: true });
  res.json(updatedBlog);
}

export async function deleteBlog(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Blog with id ${id} not found!`);

  await PostMessage.findByIdAndRemove(id);
  console.log('deleted')
  res.json({ message: "Blog has been deleted" });
}

export async function likeBlog(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Blog with id ${id} not found!`);

  const blog = await PostMessage.findById(id);
  const updatedBlog = await PostMessage.findByIdAndUpdate(id, { likeCount: blog.likeCount + 1 }, { new: true })
  res.json(updatedBlog);
}
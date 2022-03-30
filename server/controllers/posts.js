import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import express from 'express';

const router = express.Router();

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
  const post = req.body;
  const newBlog = new PostMessage({ ...post, author: req.userId, createdAT: new Date().toISOString() });
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

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Blog with id ${id} not found!`);

  const post = await PostMessage.findById(id);
// check if user already liked post
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like the post
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedBlog = await PostMessage.findByIdAndUpdate(id, post, { new: true })
  res.json(updatedBlog);
}

export default router;
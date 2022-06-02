import mongoose from "mongoose";
import BlogMessage from "../models/blogMessage.js";
import express from 'express';

const router = express.Router();

// route handlders
export async function getBlogs(req, res) {
  const { page } = req.query;
  try {
    const postsLimit = 8;
    const startIndex = (Number(page) - 1) * postsLimit; // starting index of each page 
    const postsTotal = await BlogMessage.countDocuments({});
    const posts = await BlogMessage.find().sort({ createdAt: -1 }).limit(postsLimit).skip(startIndex);

    res.status(200).json({ data: posts, currentPage: Number(page), totalPages: Math.ceil(postsTotal / postsLimit) });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export async function getBlog(req, res) {
  const { id } = req.params;
  try {
    const post = await BlogMessage.findById(id)
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// get list of search results
export async function getBlogsBySearch(req, res) {
  const { searchTerm, tags, authorName } = req.query;
  try {
    const title = new RegExp(searchTerm, 'i'); // ignore case 
    const name = new RegExp(authorName, 'i');
    const posts = await BlogMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }, { name }] });
    console.log('posts searched from backend', posts)
    res.status(201).json({ data: posts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// add a new post to the db 
export async function createBlog(req, res) {
  const post = req.body;
  const newBlog = new BlogMessage({ ...post, author: req.userId, createdAt: new Date().toISOString() });
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
  const { id: _id } = req.params;
  const post = req.body;

  // check if id is an mongoose object id
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`Blog with id ${_id} not found!`);

  const updatedBlog = await BlogMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  res.json(updatedBlog);
}

export async function deleteBlog(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Blog with id ${id} not found!`);

  await BlogMessage.findByIdAndRemove(id);
  console.log('deleted')
  res.json({ message: "Blog has been deleted" });
}

export async function likeBlog(req, res) {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "User unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Blog with id ${id} not found!`);

  const post = await BlogMessage.findById(id);
  // check if user already liked post
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like the post 
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedBlog = await BlogMessage.findByIdAndUpdate(id, post, { new: true })
  res.json(updatedBlog);
}

export const postComment = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  const post = await BlogMessage.findById(id);

  post.comments.push(value);
  const updatedPost = await BlogMessage.findByIdAndUpdate(id, post, { new: true })
  res.json(updatedPost)
}

export default router;
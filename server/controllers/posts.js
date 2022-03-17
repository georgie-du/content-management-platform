import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// get list of posts
export async function getPosts(req, res) {
  try {
    const postMessages = await PostMessage.find().sort({ createdAt: -1 });

    console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// add a new post to the db 
export async function createPost(req, res) {
  const newPost = new PostMessage(req.body);
  console.log(newPost)

  try {
    await newPost.save();
    res.status(201).json(newPost);
    // redirect?
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


export async function updatePost(req, res) {
  const { id: user_id } = req.params;
  const post = req.body;

  // check if id is an mongoose object id
  if (!mongoose.Types.ObjectId.isValid(user_id)) return res.status(404).send(`Post with id ${user_id} not found!`);

  const updatedPost = await PostMessage.findByIdAndUpdate(user_id, { ...post, user_id }, { new: true });
  res.json(updatedPost);
}

export async function deletePost(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Post with id ${id} not found!`);

  await PostMessage.findByIdAndRemove(id);
  console.log('deleted')
  res.json({ message: "Post has been deleted" });
}
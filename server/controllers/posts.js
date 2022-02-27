import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find().sort({ createdAt: -1 });

    console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (res, req) => {
  const newPost = new PostMessage(req.body);
  console.log(newPost)

  try {
    await newPost.save();

    res.status(201).json(newPost);
    // redirect?
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

import express from "express";
import { getBlogs, createBlog, deleteBlog, updateBlog, likeBlog } from "../controllers/posts.js";
import auth from '../middleware/auth.js';
const router = express.Router();

// route handlers
router.get("/", getBlogs);
router.post("/", auth, createBlog);
router.patch("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);
router.patch("/:id/likeBlog", auth, likeBlog);

export default router;

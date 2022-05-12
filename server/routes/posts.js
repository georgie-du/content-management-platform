import express from "express";
import { getBlogs, getBlog, getBlogsBySearch, createBlog, deleteBlog, updateBlog, likeBlog } from "../controllers/posts.js";
import auth from '../middleware/auth.js';
const router = express.Router();

// route handlers
router.get("/search", getBlogsBySearch);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", auth, createBlog);
router.patch("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);
router.patch("/:id/likeBlog", auth, likeBlog);

export default router;

import express from "express";
import { getBlogs, getBlog, getBlogsBySearch, createBlog, deleteBlog, updateBlog, likeBlog, postComment } from "../controllers/posts.js";
import auth from '../middleware/auth.js';
const router = express.Router();

router.get("/", getBlogs);
router.get("/search", getBlogsBySearch);
router.get("/:id", getBlog);
router.post("/", auth, createBlog);
router.patch("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);
router.post("/:id/postComment", auth, postComment);
router.patch("/:id/likeBlog", auth, likeBlog);

export default router;

import express from "express";
import { getBlogs, createBlog, deleteBlog, updateBlog, likeBlog } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.patch("/:id/likeBlog", likeBlog);

export default router;

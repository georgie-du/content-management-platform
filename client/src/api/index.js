import axios from "axios";

// backend route
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createBlog = (newPost) => axios.post(url, newPost);
export const updateBlog = (id, updatedBlog) => axios.patch(`${url}/${id}`,updatedBlog);
export const deleteBlog = (id) => axios.delete(`${url}/${id}`);
export const likeBlog = (id) => axios.patch(`${url}/${id}/likeBlog`);
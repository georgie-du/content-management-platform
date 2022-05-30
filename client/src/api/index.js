import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

// send token to backend on each request, to verify if user is logged in
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createBlog = (newBlog) => API.post('/posts', newBlog);
export const updateBlog = (id, updatedBlog) => API.patch(`/posts/${id}`, updatedBlog);
export const deleteBlog = (id) => API.delete(`/posts/${id}`);
export const likeBlog = (id) => API.patch(`/posts/${id}/likeBlog`);
export const comment = (value, id) => API.post(`/posts/${id}/postComment`, { value });
export const fetchBlogsBySearch = (params) => API.get(`/posts/search?searchTerm=${params.searchTerm || 'none'}&tags=${params.tags}&authorName=${params.authorName || 'none'}`);

export const login = (formInfo) => API.post('/user/login', formInfo);
export const register = (formInfo) => API.post('/user/register', formInfo);
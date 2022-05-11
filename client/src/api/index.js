import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

// send token to backend on each request, to verify if user is logged in
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createBlog = (newBlog) => API.post('/posts', newBlog);
export const updateBlog = (id, updatedBlog) => API.patch(`/posts/${id}`, updatedBlog);
export const deleteBlog = (id) => API.delete(`/posts/${id}`);
export const likeBlog = (id) => API.patch(`/posts/${id}/likeBlog`);
export const fetchBlogsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const login = (formInfo) => API.post('/user/login', formInfo);
export const register = (formInfo) => API.post('/user/register', formInfo);
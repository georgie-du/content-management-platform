import axios from "axios";

// backend route
const url = "http://localhost:5000/posts";

const fetchPosts = () => axios.get(url);
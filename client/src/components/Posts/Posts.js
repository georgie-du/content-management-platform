import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

function Posts() {
  const posts = useSelector((state) => state.posts);
  const styles = useStyles();
  console.log(posts);
  return (
    <React.Fragment>
      <h1>POSTS</h1>
      <Post />
      <Post />
    </React.Fragment>
  );
}

export default Posts;

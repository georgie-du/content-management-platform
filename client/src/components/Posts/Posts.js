import React from "react";
import { Grid, LinearProgress } from '@material-ui/core'
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

function Posts({ setCurrentId }) {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const styles = useStyles();

  if (!posts.length && !isLoading) return 'Empty!';

  return (
    isLoading ? <LinearProgress /> : (
      <Grid className={styles.mainContainer} container >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={12} lg={12}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;

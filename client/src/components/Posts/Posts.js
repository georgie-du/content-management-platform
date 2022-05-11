import React from "react";
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);
  const styles = useStyles();

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={styles.mainContainer} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={4} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;

import React from "react";
import { Grid, LinearProgress } from '@material-ui/core'
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import Alert from '@material-ui/lab/Alert';
import useStyles from "./styles";

function Posts({ setCurrentId, openModal, setOpenModal }) {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const styles = useStyles();

  // if (!posts.length && !isLoading) return <Alert severity="info" color="success">
  //   So empty :/
  // </Alert>;

  return (
    isLoading ? <LinearProgress /> : (
      <Grid className={styles.mainContainer} container >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={12} lg={11}>
            <Post post={post} openModal={openModal} setCurrentId={setCurrentId} setOpenModal={setOpenModal} />
          </Grid>
        ))}
      </Grid>
    )
  );
}

export default Posts;

import React, { useEffect, useState } from "react";
import { AppBar, Container, Typography, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import winter from "./images/winter.jpg";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
// import CreatePost from "./pages/CreatePost";



const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={styles.appBar} position="static" color="inherit">
        <Typography className={styles.header} color="primary" variant="h4" align="center">
          Content Management
        </Typography>
        <img className={styles.image} src={winter} alt="blog" height="60" />
      </AppBar>

      <Posts setCurrentId={setCurrentId} />

      <Grid item xs={12} sm={4}>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </Grid>
    </Container>

  );
};
export default App;

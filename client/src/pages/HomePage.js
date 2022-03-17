
import React, { useEffect } from "react";
import { AppBar, Container, Typography, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../actions/posts"
import winter from "../images/winter.jpg";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import useStyles from "../styles";
// import CreatePost from "./pages/CreatePost";
import { Link, Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";


function HomePage() {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div> <Container maxWidth="lg">
    <AppBar className={styles.appBar} position="static" color="inherit">
      <Typography className={styles.header} color="primary" variant="h3" align="center">


        Content Management
      </Typography>
      <img className={styles.image} src={winter} alt="blog" height="60" />
    </AppBar>
    <Link to="/posts">Create</Link>
    {/* <Grow in> */}
    {/* <Container  maxWidth={false}>
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}> */}
    <Posts />
    {/* </Grid> */}
    <Grid item xs={12} sm={4}>
      <Form />
    </Grid>
    {/* </Grid>
    </Container> */}
    {/* </Grow> */}
    
  </Container></div>
  )
}

export default HomePage
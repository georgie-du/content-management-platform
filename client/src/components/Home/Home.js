import React from "react";
import { Container, Grid } from "@material-ui/core";
import { getBlogs } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";



function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div>
    <Container maxWidth="lg">
      <Posts setCurrentId={setCurrentId} />
      <Grid item xs={12} sm={4}>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </Grid>
    </Container>
    </div>
  )
}

export default Home
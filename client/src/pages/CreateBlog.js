import React from 'react'
import Form from '../components/Form/Form'

import { Container, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getBlogs } from '../actions/posts';

function CreateBlog() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div>
      <Container maxWidth="lg">
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Container>
    </div>
  )
}

export default CreateBlog;
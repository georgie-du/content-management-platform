import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Typography, Box } from '@material-ui/core';
import { getBlogs } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";



function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));


  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <>
    {(!user?.result?.name) ?
      (
        <Container >
          <Typography variant='h6' >

            <Box sx={{ fontFamily: 'Monospace', m:2 }}>
              Please Login to create blogs and like other people's blogs.
            </Box>
          </Typography>
          {' '}
          <Posts setCurrentId={setCurrentId} />
        </Container>
      ) : (<Container >
        <Posts setCurrentId={setCurrentId} />
        <Grid item xs={12} sm={12} >
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Container>)
    }

  </>
  )
}

export default Home
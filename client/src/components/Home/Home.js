import React from "react";
import { Container, Grid, Typography, Box, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { getBlogs } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PagesBar from "../Pagination/Pagination";


const useQuery = () => new URLSearchParams(useLocation().search);

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch, currentId]);

  return (
    <>
      {(!user?.result?.name) ?
        (
          <Container maxWidth='xl' >
            <Typography variant='h6' >

              <Box sx={{ fontFamily: 'Monospace', m: 2 }}>
                Please Login to create blogs and like other people's blogs.
              </Box>
            </Typography>
            {' '}
            <Posts setCurrentId={setCurrentId} />
            <PagesBar />
          </Container>
        ) : (<Container maxWidth='xl'>
          <Posts setCurrentId={setCurrentId} />
          <Grid item xs={12} sm={12} >
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <PagesBar />
            </Paper>
          </Grid>
        </Container>)
      }

    </>
  )
}

export default Home
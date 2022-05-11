import React from "react";
import { Container, Grid, Typography, Box, Paper, AppBar, TextField, Grow, Button } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { getBlogs, getBlogsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PagesBar from "../Pagination/Pagination";
import ChipInput from 'material-ui-chip-input'
import useStyles from './styles';


const useQuery = () => new URLSearchParams(useLocation().search);

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const styles = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);



  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchBlogPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchBlogPost = () => {
    if (search.trim() || tags) {
      // dispatch -> fetch search post
      dispatch(getBlogsBySearch({ search, tags: tags.join(',') }))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      navigate('/');
    }

  };

  return (
    <>
      <Grow in>
        {(!user?.result?.name) ?
          (
            <Container maxWidth='xl' >
              <Typography variant='h6' >

                <Box sx={{ fontFamily: 'Monospace', m: 2 }}>
                  Please Login to create blogs and like other people's blogs.
                </Box>
              </Typography>
              {' '}
              <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={styles.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppBar className={styles.appBarSearch} position="static" color="inherit">
                    <TextField name="search" label="Search" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
                    <ChipInput style={{ margin: '10px 0' }} value={tags} label='Search Tags' onAdd={handleAdd} onDelete={handleDelete} />
                    <Button onClick={searchBlogPost} className={styles.searchButton} variant="contained" color="default">Search</Button>
                  </AppBar>
                </Grid>
              </Grid>
              <PagesBar />
            </Container>
          ) : (<Container maxWidth='xl'>
            <Posts setCurrentId={setCurrentId} />
            <Grid item xs={12} sm={12} md={10}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6}>
                <PagesBar page={page} />
              </Paper>
            </Grid>
          </Container>)
        }
      </Grow>
    </>
  )
}

export default Home
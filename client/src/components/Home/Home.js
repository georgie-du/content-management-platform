import React from "react";
import { Container, Grid, Typography, Box, AppBar, TextField, Grow, Button } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import { getBlogsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from "react-redux";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
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
        <Container maxWidth='lg' >
          {(!user?.result?.name) ?
            (
              <>
                <Typography variant='h6' >
                  <Box sx={{ fontFamily: 'Monospace', m: 2 }}>
                    Please Login to create blogs and like other people's blogs.
                  </Box>
                </Typography>
                <Grid container style={{ justifyContent: "space-between" }} alignItems="stretch" spacing={3} className={styles.gridContainer}>
                  <Grid item xs={12} sm={12} md={8}>
                    <Posts setCurrentId={setCurrentId} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <AppBar className={styles.appBarSearch} position="static" color="inherit">
                      <TextField name="search" label="Search Title" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
                      <ChipInput style={{ margin: '10px 0' }} value={tags} label='Search Tags' onAdd={handleAdd} onDelete={handleDelete} />
                      <Button onClick={searchBlogPost} className={styles.searchButton} variant="contained" color="default">Search</Button>
                    </AppBar>
                  </Grid>
                </Grid>
                {(!searchQuery && !tags.length) && (
                  <Box className={styles.pagination}>
                    <Pagination page={page} />
                  </Box>
                )}
                {/* </Container> */}
              </>
            ) : (
              // <Container maxWidth='xl'>
              <>
                <Grid container className={styles.gridContainer}>
                  <Grid item xs={12} sm={6} md={7} >
                    <Posts setCurrentId={setCurrentId} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} >
                    <AppBar className={styles.appBarSearch} position="sticky" color="inherit">
                      <TextField name="search" label="Search Title" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
                      <ChipInput style={{ margin: '10px 0' }} value={tags} label='Search Tags' onAdd={handleAdd} onDelete={handleDelete} />
                      <Button onClick={searchBlogPost} className={styles.searchButton} variant="contained" color="default">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                  </Grid>
                </Grid>
                {(!searchQuery && !tags.length) && (
                  <Box className={styles.pagination}>
                    <Pagination page={page} />
                  </Box>
                )}
              </>
            )
          }
        </Container>
      </Grow>
    </>
  )
}

export default Home
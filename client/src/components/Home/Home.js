import React, { useEffect } from "react";
import { Container, Grid, Box, AppBar, TextField, Grow, Button } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { useNavigate, useLocation } from "react-router-dom";
import { getBlogsBySearch, getBlogs } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import ChipInput from 'material-ui-chip-input'
import useStyles from './styles';
import '../Modal/index.css';
import MostLiked from "../MostLiked/MostLiked";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";

const useQuery = () => new URLSearchParams(useLocation().search);

function Home() {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const styles = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    dispatch(getBlogs());
  }, [currentId, dispatch])


  let params = {};
  (function getParams() {
    query.forEach(function (val, key) {
      params[key] = val
    });
    return params;
  })()

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchBlogPost = () => {
    if (searchTerm.trim() || tags || authorName.trim()) {
      // dispatch -> fetch search post
      dispatch(getBlogsBySearch({ searchTerm, tags: tags.join(','), authorName }))
      navigate(`/posts/search?searchTerm=${searchTerm || 'none'}&tags=${tags.join(',') || 'none'}&authorName=${authorName || 'none'}`)
    } else {
      console.log('search failed')
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchBlogPost();
    }
  };
  return (
    <>
      <Grow in>
        <Container maxWidth='lg' >
          {(!user?.result?.name) ?
            (
              <>
                <Grid container spacing={3} className={styles.gridContainer}>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Alert severity="info" color="success">
                      {t('homeLogin_message')}
                    </Alert>
                    <Posts setCurrentId={setCurrentId} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <AppBar className={styles.appBarSearch} position="static" color="inherit" elevation={1}>
                      <TextField name="search" label={t("searchTitle")} fullWidth value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} />
                      <TextField name="authorName" label='autor' fullWidth value={authorName} onChange={(e) => setAuthorName(e.target.value)} onKeyPress={handleKeyPress} />
                      <ChipInput style={{ margin: '10px 0' }} value={tags} label={t("searchTags")} onAdd={handleAdd} onDelete={handleDelete} />
                      <Button onClick={searchBlogPost} className={styles.searchButton} variant="contained" color="default">{t("searchButton")}</Button>
                    </AppBar>
                    <AppBar className={styles.appBarMostLiked} position="sticky" color="inherit" elevation={1}>
                      <MostLiked />
                    </AppBar>
                  </Grid>
                </Grid>
                {(!params && !tags.length) && (
                  <Box className={styles.pagination}>
                    <Pagination page={page} />
                  </Box>
                )}
              </>
            ) : (
              <>
                <Modal currentId={currentId} setCurrentId={setCurrentId} open={openModal} onClose={() => setOpenModal(false)} />
                <Grid container className={styles.gridContainer} spacing={3} >
                  <Grid item xs={12} sm={12} md={7} lg={8} >
                    <Posts setCurrentId={setCurrentId} openModal={openModal} setOpenModal={setOpenModal} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} >
                    <AppBar className={styles.appBarSearch} position="static" color="inherit" elevation={1}>
                      <TextField name="search" label={t("searchTitle")} fullWidth value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} />
                      <TextField name="authorName" label='autor' fullWidth value={authorName} onChange={(e) => setAuthorName(e.target.value)} onKeyPress={handleKeyPress} />
                      <ChipInput style={{ margin: '10px 0 ' }} value={tags} label={t("searchTags")} onAdd={handleAdd} onDelete={handleDelete} />
                      <Button onClick={searchBlogPost} className={styles.searchButton} variant="contained" color="default">{t("searchButton")}</Button>
                    </AppBar>
                    {(posts.length > 2) ? (
                      <AppBar className={styles.appBarMostLiked} position="sticky" color="inherit" elevation={1}>
                        <Button variant="contained" color="default" onClick={() => setOpenModal(true)} className={styles.createButton}
                        >{t('createArticle')}</Button>
                        <MostLiked />
                      </AppBar>
                    ) : ('')}

                  </Grid>
                </Grid>
                {(!params && !tags.length) && (
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
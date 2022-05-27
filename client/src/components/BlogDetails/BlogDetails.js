import React, { useEffect, useState } from 'react'
import Comments from './Comments'
import { Typography, LinearProgress, Paper, Divider, Box, Container } from '@material-ui/core'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { getBlog, getBlogsBySearch } from '../../actions/posts';


function BlogDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styles = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBlog(id));
  }, [id])

  useEffect(() => {
    if (post) {
      dispatch(getBlogsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [post])

  if (!post) return null;

  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }} >
        <LinearProgress />
      </Box>
    )
  }
  const recommendedBlogs = posts.filter(({ _id }) => _id !== post._id) // filter out the current post

  const openBlog = (_id) => navigate(`/posts/${_id}`);

  return (
    <Container maxWidth='lg' >
      <div className={styles.outerContainer}>
        <div className={styles.card}>
          <Paper style={{ padding: '20px', borderRadius: '15px', width: '100%' }}  >
            <div className={styles.imageSection}>
              <img className={styles.media} src={post.fileSelected || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
            <div className={styles.section}>
              <Typography variant="h4" component="h3">{post.title}</Typography>
              <Typography variant="h6">Author: {post.name}</Typography>
              <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
              <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Comments post={post} />
              <Divider style={{ margin: '20px 0' }} />
              {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
            </div>

          </Paper>

          <Paper >
            {!!recommendedBlogs.length && (
              <div className={styles.section}>
                <Typography gutterBottom variant="h5">Similar articles:</Typography>
                {/* <Divider /> */}
                <div className={styles.recommendedBlogs}>
                  {recommendedBlogs.map(({ title, name, message, likes, fileSelected, _id }) => (
                    <div style={{ margin: '20px', cursor: 'pointer', width: '250px' }} onClick={() => openBlog(_id)} key={_id}>
                      <img src={fileSelected || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} className={styles.recommendedBlogsImg} />
                      <Typography gutterBottom variant="h6">{title}</Typography>
                      <Typography gutterBottom variant="subtitle2">Author: {name}</Typography>
                      {/* <Typography gutterBottom variant="subtitle2">{message.split(' ').slice(0, 20).join(' ')}...</Typography>
                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography> */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Paper>
        </div>
      </div>
    </Container >
  )
}

export default BlogDetails
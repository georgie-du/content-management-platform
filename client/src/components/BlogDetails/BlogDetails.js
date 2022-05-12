import React, { useEffect } from 'react'

import { Typography, rProgress, LinearProgress, Paper, Divider, Box } from '@material-ui/core'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { getBlog } from '../../actions/posts';

function BlogDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  console.log(post)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styles = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBlog(id));
  }, [id])

  if (!post) return null;
  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }} >
        <LinearProgress />
      </Box>
    )
  }
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={5}>
      <div className={styles.imageSection}>
        <img className={styles.media} src={post.fileSelected || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
      </div>
      <div className={styles.card}>
        <div className={styles.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
      {/* {!!recommendedPosts.length && (
        <div className={styles.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={styles.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </Paper>
  )
}

export default BlogDetails
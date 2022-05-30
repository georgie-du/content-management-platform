import React from 'react'
import { Typography, LinearProgress, Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { useTranslation } from 'react-i18next';

const MostLiked = () => {
  const navigate = useNavigate();
  const styles = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { t } = useTranslation();

  const likedPosts = posts.filter(post => post.likes.length > 1);
  const mostLikedPosts = likedPosts.sort((a, b) => b.likes.length - a.likes.length)
  const firstFourLikedPosts = mostLikedPosts.slice(0, 3);
  const openBlog = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }} >
        <LinearProgress />
      </Box>
    )
  }

  return (
    <>
      {/* <Grow in> */}
      {/* <Container maxWidth='lg' > */}
      {/* <div className={styles.outerContainer}> */}
      <div className={styles.card}>
        {/* <AppBar className={styles.appBarSearch} color="inherit" elevation={1}> */}

        {!!firstFourLikedPosts.length && (
          <div className={styles.section}>
            <Typography gutterBottom variant="h5">{t("mostLikedArticles")}:</Typography>
            {/* <Divider /> */}
            <div className={styles.mostLikedPosts}>
              {firstFourLikedPosts.map(({ title, name, message, likes, fileSelected, _id }) => (
                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openBlog(_id)} key={_id}>
                  <img src={fileSelected || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} className={styles.mostlikedPostsImg} alt='' />
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  {/* <Typography gutterBottom variant="subtitle2">{name}</Typography> */}
                  {/* <Typography gutterBottom variant="subtitle2">{message.split(' ').slice(0, 20).join(' ')}...</Typography> */}
                  {/* <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography> */}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* </AppBar> */}
      </div>
      {/* </div> */}
      {/* </Container > */}
      {/* </Grow> */}
    </>
  )
}

export default MostLiked
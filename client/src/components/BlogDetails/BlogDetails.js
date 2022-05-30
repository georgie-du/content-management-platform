import React, { useEffect, useState } from 'react'
import Comments from './Comments'
import { Typography, LinearProgress, Paper, Divider, Box, Container, Button } from '@material-ui/core'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import useStyles from './styles'
import { getBlog, getBlogsBySearch } from '../../actions/posts';
import { useTranslation } from 'react-i18next';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import { deleteBlog } from '../../actions/posts'
import Modal from '../Modal/Modal';

function BlogDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));
  const [currentId, setCurrentId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [currentId, setCurrentId] = useState(0);
  const styles = useStyles();
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getBlog(id));
  }, [dispatch, currentId, id])

  // useEffect(() => {
  //   if (post) {
  //     dispatch(getBlogsBySearch({ search: 'none', tags: post?.tags.join(','), authorName: 'none' }))
  //   }
  // }, [post])

  if (!post) return null;

  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }} >
        <LinearProgress />
      </Box>
    )
  }
  const recommendedBlogs = posts.filter(({ _id }) => _id !== post._id) // filter out the current post
  const openBlog = (_id) => navigate(`/posts/${post._id}`);

  const handleUpdate = (e) => {
    e.preventDefault();
    setCurrentId(post._id);
    console.log(post._id)
    setOpenModal(true)
  };

  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteBlog(post._id))
    navigate('/')
  }
  return (
    <Container maxWidth='lg' >
      <div className={styles.outerContainer}>
        <div className={styles.card}>
          <Paper style={{ padding: '20px', borderRadius: '15px', width: '100%' }}  >
            <div className={styles.imageSection}>
              <img className={styles.media} src={post.fileSelected || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
            {(user?.result?.googleId === post?.author || user?.result?._id === post?.author) && (

              <Box className={styles.overlay2} >
                <Modal currentId={currentId} setCurrentId={setCurrentId} open={openModal} onClose={() => setOpenModal(false)} />
                <Button size='small' className={`${styles.editBtn} ${styles.overlay2}`} name="edit" onClick={handleUpdate}>
                  <BorderColorOutlinedIcon fontSize="small"></BorderColorOutlinedIcon>
                </Button>
                <Button size='small' className={`${styles.deleteBtn} ${styles.overlay2}`} onClick={handleDelete}>
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </Button>

              </Box>
            )}
            <div className={styles.section}>
              <Typography variant="h4" component="h3">{post.title}</Typography>
              <Typography variant="h6">{t("author")}: {post.name}</Typography>
              <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
              <Typography style={{ margin: '20px 0' }} gutterBottom variant="body1" component="p">{post.message}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Comments post={post} />
              <Divider style={{ margin: '20px 0' }} />
            </div>
          </Paper>

          <Paper >
            {!!recommendedBlogs.length && (
              <div className={styles.section}>
                <Typography gutterBottom variant="h5">Similar articles:</Typography>
                <div className={styles.recommendedBlogs}>
                  {recommendedBlogs.map(({ title, name, fileSelected, _id }) => (
                    <div className={styles.recommendedBlog} onClick={() => openBlog(_id)} key={_id}>
                      <img src={fileSelected || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} className={styles.recommendedBlogsImg} alt='' />
                      <Typography gutterBottom variant="h6">{title}</Typography>
                      <Typography gutterBottom variant="subtitle2">{t("author")}: {name}</Typography>
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
import React from "react";
import useStyles from "./styles";
import { Card, CardContent, CardActions, CardMedia, Button, Typography, Box } from '@material-ui/core';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Post({ post, setCurrentId, openModal, setOpenModal }) {
  const dispatch = useDispatch();
  const styles = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleUpdate = () => {
    setCurrentId(post._id);
    console.log(post._id)
    setOpenModal(true)
  };

  const openBlog = (_id) => navigate(`/posts/${post._id}`);

  const Likes = () => {
    if (post.likes.length > 0) {
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? `${t("like")}` : `${t("likes")}`}</>
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;{t("likeIt")}</>;
  };


  return (
    <Card className={styles.card} raised elevation={3}>
      <div className={styles.cardInner}>
        <Box className={styles.pointer} onClick={() => openBlog(post._id)} >
          <CardMedia className={styles.media} image={post.fileSelected || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        </Box>

        {(user?.result?.googleId === post?.author || user?.result?._id === post?.author) && (
          <Box className={styles.overlay1} >
            <Button size='small' startIcon={<BorderColorOutlinedIcon />} className={`${styles.editBtn} ${styles.overlay1}`} name="edit" onClick={handleUpdate}>
              {/* <BorderColorOutlinedIcon fontSize="small"></BorderColorOutlinedIcon> */}
            </Button>
            <Button size='small' className={`${styles.deleteBtn} ${styles.overlay1}`} onClick={() => { dispatch(deleteBlog(post._id)) }}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </Button>

          </Box>
        )}

        <Box className={styles.pointer} onClick={() => openBlog(post._id)}>
          <Typography className={styles.title} gutterBottom variant="h5">{post.title}</Typography>
          <Box className={styles.overlay}>
            <Typography variant='body2' style={{ paddingRight: '25px' }}>{t("author")}: {post.name}</Typography>
            <Typography variant='body2'>{t("created")}: {moment(post.createdAt).fromNow()}</Typography>
          </Box>
          <CardContent>
            <Typography variant="body2" className={styles.snippet} color="textSecondary" component="p">{post.message.split(' ').slice(0, 35).join(' ')}...</Typography>
          </CardContent>
        </Box>

        <CardActions className={styles.cardActions}>
          <Button size='small' color='default' disabled={!user?.result} onClick={() => dispatch(likeBlog(post._id))}>
            <Likes />
          </Button>
          <Button className={styles.buttonReadMore} variant='text' size='small' onClick={() => openBlog(post._id)} >{t("continueReading")}</Button>
        </CardActions>
      </div>
    </Card>
  )
}

export default Post;

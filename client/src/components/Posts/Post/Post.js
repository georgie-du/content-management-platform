import React from "react";
import useStyles from "./styles";
import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@material-ui/core';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();
  const styles = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleUpdate = () => {
    setCurrentId(post._id);
  };

  const openBlog = (_id) => navigate(`/posts/${post._id}`);

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };


  return (
    <Card className={styles.card} raised elevation={3}>
      <div className={styles.cardAction} onClick={() => openBlog(post._id)} ></div>
      <CardMedia className={styles.media} image={post.fileSelected || 'https://picsum.photos/200'} title={post.title} />
      <div className={styles.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.author || user?.result?._id === post?.author) && (
        <div className={styles.overlay2} >
          <Button size='small' className={`${styles.openBtn} ${styles.overlay2}`} onClick={() => { }}>
            <KeyboardArrowRightOutlinedIcon fontSize="medium" />
          </Button>
          <Button size='small' className={`${styles.editBtn} ${styles.overlay2}`} name="edit" onClick={handleUpdate}>
            <BorderColorOutlinedIcon fontSize="small"></BorderColorOutlinedIcon>
          </Button>
          <Button size='small' className={`${styles.deleteBtn} ${styles.overlay2}`} onClick={() => { dispatch(deleteBlog(post._id)) }}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </Button>

        </div>
      )}
      <Typography className={styles.title} gutterBottom variant="h6">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
      </CardContent>

      <CardActions className={styles.cardActions}>
        <Button size='small' color='default' disabled={!user?.result} onClick={() => dispatch(likeBlog(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.author || user?.result?._id === post?.author) && (
          <>
            {/* <Button size='small' className={styles.overlay2} name="edit" color='default' onClick={handleUpdate}>
              <BorderColorOutlinedIcon fontSize="small"></BorderColorOutlinedIcon>
            </Button> */}
            {/* <Button size='small' color='default' onClick={() => { dispatch(deleteBlog(post._id)) }}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </Button> */}
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default Post;

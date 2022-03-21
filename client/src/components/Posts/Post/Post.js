import React from "react";
import useStyles from "./styles";
import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from "react-redux";
import { deleteBlog , likeBlog} from "../../../actions/posts";

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();
  const styles = useStyles();
  return (
    <Card className={styles.card}>
      <CardMedia className={styles.media} image={post.fileSelected || 'https://picsum.photos/200'} title={post.title} />
      <div className={styles.overlay}>
        <Typography variant='h6'>{post.author}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={styles.overlay2}>
        <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id)} >
          <MoreHorizIcon fontSize='medium' />
        </Button>
      </div>
      <Typography className={styles.title} gutterBottom variant="h5">{post.title}</Typography>
      <CardContent>
        <Typography paragraph color="textSecondary" >{post.message}</Typography>
      </CardContent>
      <div className={styles.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardActions className={styles.cardActions}>
        <Button size='small' color='primary' onClick={() => { dispatch(likeBlog(post._id))}}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like{' '}
          {post.likeCount}
        </Button>

        <Button size='small' color='primary' onClick={() => { dispatch(deleteBlog(post._id)) }}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post;

import React, { useState, useRef } from 'react'
import { Typography, Button, TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useStyles from './styles'
import { postComment } from '../../actions/posts';

function Comments({ post }) {

  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const styles = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const lastComment = `${user?.result?.name}: ${comment}`;
    const recentComments = await dispatch(postComment(lastComment, post._id));

    setComment('');
    setComments(recentComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth', align: false });
  };

  return (
    <div>
      <div className={styles.commentsOuterContainer}>
        <div className={styles.commentsInnerContainer}>
          <Typography gutterBottom variant="h5">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '60%' }}>
            <Typography gutterBottom variant="h6">Leave a comment</Typography>
            <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
            <br />
            <Button style={{ marginTop: '10px', backgroundColor: '#63e4be', color: '#fff', }} fullWidth disabled={!comment.length} variant="contained" onClick={handleComment}>
              Post Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );

}

export default Comments
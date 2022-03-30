import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateBlog } from '../../actions/posts';



function Form({ currentId, setCurrentId }) {
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		fileSelected: ''
	})
	const styles = useStyles();
	const dispatch = useDispatch();
	const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null);
	const user = JSON.parse(localStorage.getItem('profile'));

	useEffect(() => {
		if (post) setPostData(post);
	}, [post])
	const handleTextField = (e) => setPostData({ ...postData, [e.target.name]: e.target.value });

	const clearFields = () => {
		setCurrentId(null);
		setPostData({	
		title: '',
		message: '',
		tags: '',
		fileSelected: ''});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updateBlog(currentId, {...postData, name: user?.result?.name}))
		}
		else {
			dispatch(createBlog({...postData, name: user?.result?.name}));
		}
		clearFields();
	}
	

	return (
		<Paper className={styles.paper}>
			<form autoComplete='off' className={`${styles.root} ${styles.form}`} onSubmit={handleSubmit} >
				<Typography variant="h6" >{currentId ? 'Edit' : 'Create'} a blog post</Typography>
				<TextField name="title" required label="Title" variant="outlined" fullWidth value={postData.title} onChange={handleTextField} />
				<TextField name="message" required label="Message" variant="outlined" fullWidth value={postData.message} onChange={handleTextField} />
				<TextField name="tags" required label="Tags" variant="outlined" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
				<div className={styles.fileInput}>
					<FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, fileSelected: base64 })} />
				</div>
				<Button className={styles.buttonSubmit} color="primary" variant="contained" size="large" type="submit" fullWidth>Submit</Button>
				<Button color="secondary" variant="contained" size="small" type="submit" fullWidth onClick={clearFields}>Clear</Button>
			</form>
		</Paper>
	)
}

export default Form;

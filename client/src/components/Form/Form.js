import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper, ButtonGroup } from '@material-ui/core';
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
	const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null);
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
			fileSelected: ''
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (currentId) {
			dispatch(updateBlog(currentId, { ...postData, name: user?.result?.name }))
		}
		else {
			dispatch(createBlog({ ...postData, name: user?.result?.name }));
		}
		clearFields();
	}


	return (
		<>
			{/* <Container maxWidth="lg" className={styles.formContainer} justifyContent='center'> */}
			<Paper className={styles.paper} style={{justifyContent:"center"}} >
				<form autoComplete='off' className={styles.form} onSubmit={handleSubmit} >
					<Typography className={styles.createBlog} variant="h6" margin="normal" >{currentId ? 'Edit' : 'Create'} a blog post</Typography>
					<TextField name="title" required margin="dense" label="Title" variant="standard" fullWidth value={postData.title} onChange={handleTextField} />
					<TextField name="message" multiline margin="dense" rows='5' required label="Message" variant="standard" fullWidth value={postData.message} onChange={handleTextField} />
					<TextField name="tags" required label="Tags" margin="dense" variant="standard" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
					<div className={styles.fileInput}>
						<FileBase type="file" multiple={false} value={postData.fileSelected} onDone={({ base64 }) => setPostData({ ...postData, fileSelected: base64 })} />
					</div>
					<ButtonGroup color="primary" aria-label="medium secondary button group">
						<Button type="submit" >Submit</Button>
						<Button type="submit" onClick={clearFields}>Clear</Button>
					</ButtonGroup>
				</form>
			</Paper>
			{/* </Container> */}
		</>
	)
}

export default Form;

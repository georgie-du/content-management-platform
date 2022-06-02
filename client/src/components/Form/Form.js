import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, ButtonGroup } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateBlog } from '../../actions/posts';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Form({ currentId, setCurrentId, onClose }) {
	const navigate = useNavigate();
	const styles = useStyles();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const blog = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null);
	const user = JSON.parse(localStorage.getItem('profile'));
	
	const [blogData, setBlogData] = useState({
		title: '',
		message: '',
		tags: '',
		fileSelected: ''
	})

	useEffect(() => {
		if (blog) setBlogData(blog);
	}, [blog, dispatch])

	const handleTextField = (e) => setBlogData({ ...blogData, [e.target.name]: e.target.value });

	const clearFields = () => {
		setCurrentId(null);
		setBlogData({
			title: '',
			message: '',
			tags: '',
			fileSelected: ''
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (currentId) {
			dispatch(updateBlog(currentId, { ...blogData, name: user?.result?.name }, navigate))
		}
		else {
			dispatch(createBlog({ ...blogData, name: user?.result?.name }));

		}
		clearFields();
		onClose();
	}


	return (
		<>
			<form autoComplete='off' className={styles.form} onSubmit={handleSubmit} >
				<Typography className={styles.createBlog} variant="h6" margin="normal" >{currentId ? `${t("edit")}` : `${t("create")} ${t("a_blog_post")}`} </Typography>
				<TextField name="title" required margin="dense" label={t("title")} variant="standard" fullWidth value={blogData.title} onChange={handleTextField} />
				<TextField name="message" multiline margin="dense" rows='5' required label={t("message")} variant="standard" fullWidth value={blogData.message} onChange={handleTextField} />
				<TextField name="tags" required label={t("tags")} margin="dense" variant="standard" fullWidth value={blogData.tags} onChange={(e) => setBlogData({ ...blogData, tags: e.target.value.split(',') })} />
				<div className={styles.fileInput}>
					<FileBase type="file" multiple={false} value={blogData.fileSelected} onDone={({ base64 }) => setBlogData({ ...blogData, fileSelected: base64 })} />
				</div>
				<ButtonGroup className={styles.buttonSubmit} aria-label="medium secondary button group">
					<Button type="submit" >{t("submit")}</Button>
					<Button type="submit" onClick={clearFields}>{t("clear")}</Button>
				</ButtonGroup>
			</form>
		</>
	)
}

export default Form;

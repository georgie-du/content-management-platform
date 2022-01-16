import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import blog from "./images/blog.jpg";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

const App = () => {
	return (
		<Container max-width="lg">
			<AppBar position="static" color="inherit">
				<Typography variant="h3" align="center">
					Content Management
				</Typography>
				<img src={blog} alt="blog" height="40" />
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justify="space-between"
						alignItems="stretch"
						spaceing="{3}"
					>
						<Grid item xs={12} sm={7}>
							<Posts />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};
export default App;

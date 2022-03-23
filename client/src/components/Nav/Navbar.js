import React from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from './styles'
// import winter from '../../images/winter.jpg'
import { Link } from 'react-router-dom'

function Navbar() {
  const styles = useStyles();
  const user = null;

  return (
    <AppBar className={styles.appBar} position="static" color="inherit">
      <div className={styles.logoContainer}>
        <Typography className={styles.header} component={Link} to="/" color="primary" variant="h4" align="center">
          Content Management
        </Typography>
        {/* <img className={styles.image} src={winter} alt="blog" height="60" /> */}
      </div>
      <Toolbar className={styles.toolbar}>
        {user ? (
          <div className={styles.profile}>
            <Avatar className={styles.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={styles.userName} variant="h6" >{user.result.name}</Typography>
            <Button variant="contained" className={styles.logout} color="secondary">Logout</Button>
          </div>
        ) : (<Button component={Link} to="/auth" variant="outlined" color="primary">Sign in</Button>)}
        <Button  component={Link} to="/createBlog" className={styles.logout} color="text.secondary">Create Blog</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
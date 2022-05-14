import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography,Container } from "@material-ui/core";
import useStyles from './styles'
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const styles = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const token = user?.token;
    // logout user after 1h
    if (token) {
      const decodedToken = decode(token);
      console.log(decodedToken.exp)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })
    navigate('/auth');
    setUser(null);
  }

  return (
    <Container maxWidth='lg' >
      <AppBar className={styles.appBar} position="static" color="inherit">
        <div className={styles.logoContainer}>
          <Typography className={styles.header} component={Link} to="/" color="primary" variant="h4" align="center">
            i<span className={styles.headerSpan}>B</span>log
          </Typography>
        </div>
        <Toolbar className={styles.toolbar}>
          {user ? (
            <div className={styles.profile}>
              <Avatar className={styles.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={styles.userName} variant="h6" >{user.result.name}</Typography>
              <Button variant="contained" className={styles.logout} onClick={logout} >Logout</Button>
            </div>
          ) : (
            <>
              <Button component={Link} to="/" variant="text" className={styles.navLinks}>Blogs</Button>
              <Button component={Link} to="/auth" variant="text" className={styles.navLinks}>Log in</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  )
}

export default Navbar;
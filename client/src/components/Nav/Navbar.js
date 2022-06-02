import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography, Container, ButtonGroup } from "@material-ui/core";
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Navbar() {
  const styles = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // const userId = useSelector((state) => state.user.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const token = user?.token;
    // logout user after 1h
    if (token) {
      const decodedToken = decode(token);
      // console.log(decodedToken.exp)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })
    navigate('/auth');
    setUser(null);
  }

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.currentTarget.value);
  }

  return (
    <Container maxWidth='lg' >
      <AppBar className={styles.appBar} color="inherit" position="fixed">
        <div className={styles.logoContainer}>
          <Typography className={styles.header} component={Link} to="/" color="primary" variant="h4" align="center">
            i<span className={styles.headerSpan}>B</span>log
          </Typography>
        </div>
        <Toolbar className={styles.toolbar}>
          {user ? (
            <div className={styles.profile}>
              <Avatar size='small' className={styles.avatar} src={user.result.imageUrl} alt={user.result.name}></Avatar>
              <Typography className={styles.userName} variant="h6" >{user.result.name}</Typography>
              <Button component={Link} to="/" variant="text" className={styles.navLinks}>{t('home')}</Button>
              <Button className={styles.logout} onClick={logout} >{t('logout')}</Button>
              <ButtonGroup aria-label="medium secondary button group">
                <Button size='small' variant="outlined" onClick={changeLanguage} value='en'>EN</Button>
                <Button size='small' variant="outlined" onClick={changeLanguage} value='ro'>RO</Button>
              </ButtonGroup>
            </div>
          ) : (
            <>
              <Button component={Link} to="/" variant="text" className={styles.navLinks}>{t('home')}</Button>
              <Button component={Link} to="/auth" variant="text" className={styles.navLinks}>{t('login')}</Button>
              <ButtonGroup aria-label="medium secondary button group">
                <Button size='small' variant="outlined" onClick={changeLanguage} value='en'>EN</Button>
                <Button size='small' variant="outlined" onClick={changeLanguage} value='ro'>RO</Button>
              </ButtonGroup>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Container >
  )
}

export default Navbar;
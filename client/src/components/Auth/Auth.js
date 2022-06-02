import React, { useState } from 'react'
import { Button, Avatar, Paper, Grid, Typography, Container, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import GoogleLogin from 'react-google-login';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from './styles';
import { register, login } from '../../actions/auth';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

const initialStateFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [formInfo, setFormInfo] = useState(initialStateFormFields);
  const { authFailure, isError } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const styles = useStyles();

  // open snackbar error MUI
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    isRegister ? dispatch(register(formInfo, navigate)) : dispatch(login(formInfo, navigate));
    if (isError) {
      console.log(authFailure)
    }
  };
  const handleChange = (e) => { setFormInfo({ ...formInfo, [e.target.name]: e.target.value }) };
  const handleSeePassword = () => { setSeePassword((prev) => !prev) };

  const switchMode = () => {
    setFormInfo(initialStateFormFields);
    setIsRegister((prevIsRegister) => !prevIsRegister);
    setSeePassword(false);
  };

  const googleSucces = async (res) => {
    console.log(res)
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (err) {
      console.log(err)
    }
  };

  const googleFailure = (err) => { alert('Google login failed. Please try again!', err) };

  return (
    <Container className={styles.outerContainer} maxWidth="xl" >
      <Container component="main" maxWidth="xs" className={styles.root}>
        <Paper className={styles.paper} elevation={1}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6" component='h1'>{isRegister ? t("registerButton") : t("loginButton")}</Typography>
          {isError &&
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
            ><Alert severity="error" onClose={handleClose}>{authFailure}</Alert>
            </Snackbar>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isRegister && (
                <React.Fragment>
                  <InputField name="firstName" label={t("firstName")} handleChange={handleChange} autofocus halfWidth />
                  <InputField name="lastName" label={t("lastName")} handleChange={handleChange} halfWidth />
                </React.Fragment>
              )}
              <InputField name='email' label='Email' type='email' handleChange={handleChange} />
              <InputField name='password' label={t("password")} handleChange={handleChange} type={seePassword ? 'text' : 'password'} handleSeePassword={handleSeePassword} />
              {isRegister && <InputField name='confirmPassword' label={t("confirmPassword")} type='password' handleChange={handleChange} />}
            </Grid>
            <Grid container style={{ justifyContent: "center" }}>
              <Button type='submit' variant='contained' color='primary' className={styles.submit}>
                {isRegister ? t("registerButton") : t("loginButton")}
              </Button>
              <GoogleLogin
                className={styles.googleButton}
                buttonText={t("loginWithGoogle")}
                clientId='525050224914-bjea0nrqetvscis5ulfd7mk08m1799ul.apps.googleusercontent.com'
                onSuccess={googleSucces}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
              />
            </Grid>
            <Grid container style={{ justifyContent: 'flex-end' }} >
              <Grid item>
                <Button onClick={switchMode}>{isRegister ? t("loginMessage") : t("registerMessage")}</Button>
              </Grid>
            </Grid>
          </form>

        </Paper>
      </Container>
    </Container>
  )
}

export default Auth
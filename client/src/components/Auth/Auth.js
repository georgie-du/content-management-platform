import React, { useState } from 'react'
import { Button, Avatar, Paper, Grid, Typography, Container } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { register, login } from '../../actions/auth';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}


function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [formInfo, setFormInfo] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const styles = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInfo)
    isRegister ? dispatch(register(formInfo, navigate)) : dispatch(login(formInfo, navigate));
  };
  const handleChange = (e) => { setFormInfo({ ...formInfo, [e.target.name]: e.target.value }) };
  const handleSeePassword = () => { setSeePassword((prev) => !prev) };

  const switchMode = () => {
    setFormInfo(initialState);
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
    <div className={styles.outerContainer}>
      <Container component="main" maxWidth="xs" className={styles.root}>
        <Paper className={styles.paper} elevation={1}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6" component='h1'>{isRegister ? "Register" : "Log in"}</Typography>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isRegister && (
                <React.Fragment>
                  <InputField name="firstName" label="First Name" handleChange={handleChange} autofocus halfWidth />
                  <InputField name="lastName" label="Last Name" handleChange={handleChange} halfWidth />
                </React.Fragment>
              )}
              <InputField name='email' label='Email' type='email' handleChange={handleChange} />
              <InputField name='password' label='Password' handleChange={handleChange} type={seePassword ? 'text' : 'password'} handleSeePassword={handleSeePassword} />
              {isRegister && <InputField name='confirmPassword' label='Confirm Password' type='password' handleChange={handleChange} />}
            </Grid>
            <Grid container style={{ justifyContent: "center" }}>
              <Button type='submit' variant='contained' color='primary' className={styles.submit}>
                {isRegister ? 'Register' : 'Log In'}
              </Button>
              <GoogleLogin
                className={styles.googleButton}
                buttonText="Login with Google"
                clientId='525050224914-bjea0nrqetvscis5ulfd7mk08m1799ul.apps.googleusercontent.com'
                // render={(renderProps) => (
                //   <Button className={styles.googleButton} variant='outlined' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>login</Button>
                // )}
                onSuccess={googleSucces}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
              />
            </Grid>
            <Grid container style={{ justifyContent: 'flex-end' }} >
              <Grid item>
                <Button onClick={switchMode}>{isRegister ? 'Have an account? Log in' : "No  account? Register"}</Button>
              </Grid>
            </Grid>
          </form>

        </Paper>
      </Container>
    </div>
  )
}

export default Auth
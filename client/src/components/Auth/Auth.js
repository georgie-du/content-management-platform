import React, { useState } from 'react'
import { Button, Avatar, Paper, Grid, Typography, Container } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from './styles';
import Icon from './icon'
import InputField from './InputField';

function Auth() {
  const styles = useStyles();
  const [isRegister, setIsRegister] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  const handleSubmit = () => { };
  const handleChange = () => { };
  const googleSucces = () => { };
  const googleFailure = () => { };
  const handleSeePassword = () => { setSeePassword((prev) => !prev) };

  const switchMode = () => {
    setIsRegister((prevIsRegister) => !prevIsRegister);
    setSeePassword(false);
  };

  return (<React.Fragment>
    <Container component="main" maxWidth="xs">
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
          <Grid container justifyContent='center'>
          <Button type='submit' variant='contained' color='primary' className={styles.submit}>
            {isRegister ? 'Register' : 'Log In'}
          </Button>
          <GoogleLogin
          className={styles.googleButton}
            buttonText="Login with Google"
            clientId='GOOGLE ID'
            // render={(renderProps) => (
            //   <Button className={styles.googleButton} variant='outlined' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>login</Button>
            // )}
            onSuccess={googleSucces}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
          </Grid>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>{isRegister ? 'Have an account? Log in' : "No  account? Register"}</Button>
            </Grid>
          </Grid>
        </form>

      </Paper>
    </Container>
  </React.Fragment>
  )
}

export default Auth
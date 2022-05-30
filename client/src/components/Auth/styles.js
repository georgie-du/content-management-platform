import dots from '../../images/dots.png';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  outerContainer: {
    backgroundImage: `url(${dots})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '100vh'
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#63e4be",
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#764ed8",
  },
  googleButton: {
    margin: theme.spacing(3, 1, 2),
  },
  
}));
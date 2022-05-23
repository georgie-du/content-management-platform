import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    justifyContent: 'space-around',
    borderRadius: 15,
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3px 50px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  header: {
    color: '#63e4be',
    textDecoration: 'none',
    fontFamily: "Quicksand",
    fontWeight: "bold",
    fontSize: '37px'
  },
  headerSpan: {
    color: '#92f8b4',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: '#bbb',
    [theme.breakpoints.down('sm')]: {
      // fontSize: '.7rem',
      textAlign: 'center',
      justifyContent: 'space-evenly',
    },
  },
  avatar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '20%',
    },
  },
  logout: {
    backgroundColor: '#63e4be',
    color: '#fff'
  },
  navLinks: {
    color: '#63e4be',
    fontSize: '16px',
    margin: '0 5px'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    justifyContent: 'space-between',
    borderRadius: 15,
    margin: '10px 0',
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
    width: '400px',
  },
  profile: {
    display: 'flex',
    width: '400px',
    justifyContent: 'space-evenly'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: '#666'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
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
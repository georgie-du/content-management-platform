import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 10,
    marginBottom: '1rem',
    marginTop: '2rem',
    display: 'flex',
    padding: '16px',
    top: '25px',
    zIndex: '0',
  },
  pagination: {
    borderRadius: 15,
    marginTop: '1rem',
    padding: '16px',
    borderColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
  },
  gridContainer: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  searchButton: {
    backgroundColor: '#63e4be',
    color: '#fff',
  },
  createButton: {
    position: 'relative',
    top: '100px',
    backgroundColor: 'lightGrey',
    color:'#fff',
  }
}));
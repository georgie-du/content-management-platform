import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 15,
    marginBottom: '1rem',
    marginTop: '1rem',
    display: 'flex',
    padding: '16px',
    top: '100px',
    zIndex: '0',

  },
  appBarMostLiked: {
    borderRadius: 15,
    marginBottom: '1rem',
    marginTop: '1rem',
    display: 'flex',
    padding: '16px',
    top: '90px',
    zIndex: '0',
    bottom: '50vh',
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
    marginTop: '80px',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    }, [theme.breakpoints.down('xs')]: {
      marginTop: '150px'
    },
  },
  searchButton: {
    position: 'relative',
    display: 'flex',
    backgroundColor: '#63e4be',
    color: '#fff',
    width: '50%',
    margin: ' auto',
    alignItems: 'center',
    // marginTop: '10%',
  },
  createButton: {
    position: 'relative',
    margin: '10px 0',
    backgroundColor: '#764ed8',
    padding: '7px',
    color: '#fff',
  }
}));
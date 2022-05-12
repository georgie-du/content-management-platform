import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    marginTop: '2rem',
    display: 'flex',
    padding: '16px',
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
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  searchButton: {
    backgroundColor: '#63e4be',
    color: '#fff',
  },
}));
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 10,
    marginBottom: '1rem',
    marginTop: '1rem',
    display: 'flex',
    padding: '16px',
    position: 'sticky',
    top: '100px',
    zIndex: '0',
    backgroundColor: 'green',
    
  },
  // outerContainer: {
  //   position: 'sticky',
  //   display: 'flex',
  //   marginTop: '100px'
  // },

  card: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    width: '100%'
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  mostlikedPosts: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '20%',
    },
  },
  mostlikedPostsImg: {
    borderRadius: '20px',
    width: "100%",
    height: "100px",
    objectFit: 'cover'
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },

}));
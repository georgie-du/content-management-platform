import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  outerContainer: {
    display: 'flex',
    marginTop: '100px'
  },
  container: {
  },
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '400px',

  },
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
    // flex: 1,
    width: '100%'
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedBlogs: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '80%',
    },
  },
  recommendedBlog: {
    margin: '20px',
    cursor: 'pointer',
    width: '250px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '80%',
    },
  },

  recommendedBlogsImg: {
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
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
    width: '40%'
  },
}));
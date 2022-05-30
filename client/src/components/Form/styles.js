import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  formContainer: {

  },

  paper: {
    padding: theme.spacing(4),
    margin: '40px 5px',
    position: 'sticky',
    top: '250px',
    display: 'block',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',

  },
  createBlog: {
    color: '#63e4be'
  },
  fileInput: {
    width: '100%',
    margin: '30px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
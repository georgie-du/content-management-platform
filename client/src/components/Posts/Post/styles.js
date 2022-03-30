import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '10px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    cursor: 'pointer',
    position: 'absolute',
    right: '5px',
    color: '#fff'
  },
  openBtn: {
    // position: 'absolute',
    top: '15px',
    // fontSize: '15px'
  },
  editBtn: {
    // position: 'absolute',
    top: '70px'
  },
  deleteBtn: {
    // position: 'absolute',
    top: '120px',
 
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
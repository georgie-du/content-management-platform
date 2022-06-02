import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: '300px',
    width: '100%',
    // paddingTop: '55%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundBlendMode: 'darken',
    borderRadius: '15px',
    objectFit: 'contain'
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  buttonReadMore: {
    color: '#63e4be',
    // backgroundColor: '#63e4be',
    cursor: 'pointer'
  },
  card: {
    display: 'flex',
    // width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '15px',
    height: '60%',
    position: 'relative',
  },
  cardInner: {
    padding: '20px',
  },
  snippet: {
    // height: '40px'
  },
  overlay: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
  },
  overlay1: {
    cursor: 'pointer',
    position: 'relative',
    right: '5px',
    color: 'gray'
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
    textAlign: 'center',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    cursor: 'pointer'
  },
  pointer: {
    cursor: 'pointer',
  }
});
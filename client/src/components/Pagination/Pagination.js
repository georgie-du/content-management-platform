import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import useStyles from './styles';
import { Link } from 'react-router-dom'

function PagesBar() {

  const styles = useStyles();
  return (
    <Pagination
      styles={{ ul: styles.ul }}
      count={5}
      page={1}
      variant='outlined'
      color='secondary'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  )
}

export default PagesBar;
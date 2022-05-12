import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getBlogs } from '../../actions/posts'

function PagesBar({ page }) {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getBlogs(page));
  }, [page])

  return (
    <Pagination
      styles={{ ul: styles.ul }}
      count={totalPages}
      page={Number(page) || 1}
      variant='outlined'
      // color='default'
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  )
}

export default PagesBar;
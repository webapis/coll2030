import React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/breadcrumbSlice'
import { Typography } from '@mui/material';
export default function BreadcrumbsContainer(props) {
  const { marka, category, subcategory, selectedTabLabel } = useSelector(state => state.breadcrumb)
  const dispatch = useDispatch()
  function handleCategoryClick() {
    dispatch(actions.selectBreadCrumbCategory())

  }

  function handleTopBreadClick() {
    dispatch(actions.selectBreadCrumbTop())
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {selectedTabLabel && <Link onClick={handleTopBreadClick} underline="hover" href="#" fontSize="small">{selectedTabLabel}</Link >}
      {marka && <Link onClick={handleTopBreadClick} underline="hover" href="#" fontSize="small" >{marka}</Link >}
      {category && <Link onClick={handleCategoryClick} underline="hover" href="#" fontSize="small" >{category}</Link >}
      {subcategory && <Typography fontSize="small" color="#9e9e9e">{subcategory}</Typography >}

    </Breadcrumbs>
  )
}
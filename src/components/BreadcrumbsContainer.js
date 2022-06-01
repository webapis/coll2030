import React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/breadcrumbSlice'
import { Typography } from '@mui/material';
export default function BreadcrumbsContainer(props) {
  const { selectedMarka, selectedCategory, selectedSubcategory, selectedTabLabel } = useSelector(state => state.breadcrumb)
  const dispatch = useDispatch()
  function handleCategoryClick() {
    dispatch(actions.selectBreadCrumbCategory())

  }

  function handleTopBreadClick() {
    dispatch(actions.selectBreadCrumbTop())
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{marginTop:1}}>
      {selectedTabLabel && <Link onClick={handleTopBreadClick} underline="hover" href="#" >{selectedTabLabel}</Link >}
      {selectedMarka && <Link onClick={handleTopBreadClick} underline="hover" href="#">{selectedMarka}</Link >}
      {selectedCategory && <Link  onClick={handleCategoryClick} underline="hover" href="#" >{selectedCategory}</Link >}
      {selectedSubcategory && <Typography color="#9e9e9e">{selectedSubcategory}</Typography >}

    </Breadcrumbs>
  )
}
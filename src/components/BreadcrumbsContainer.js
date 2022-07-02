import React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/breadcrumbSlice'
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
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
      <Link href="/Home.html"   underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          > <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />Anasayfa</Link >
      {selectedTabLabel && <Link onClick={handleTopBreadClick} underline="hover" href="#"   color="inherit">{selectedTabLabel}</Link >}
      {selectedMarka && <Link onClick={handleTopBreadClick} underline="hover" href="#"   color="inherit">{selectedMarka}</Link >}
      {selectedCategory && <Link  onClick={handleCategoryClick} underline="hover" href="#"   color="inherit">{selectedCategory}</Link >}
      {selectedSubcategory && <Typography  color="inherit">{selectedSubcategory}</Typography >}

    </Breadcrumbs>
  )
}
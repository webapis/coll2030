import React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/breadcrumbSlice'
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
export default function BreadcrumbsContainer(props) {
  const {selectedMarka,selectedSubcategory } = useSelector(state => state.maintab)
  const dispatch = useDispatch()
  function handleCategoryClick() {
   

  }

  function handleTopBreadClick() {
 
  }

  return (
    <Container>
        <Link  href="#">
         MODABURADA
        </Link>

    <Breadcrumbs aria-label="breadcrumb" sx={{marginTop:1}}>
      <Link href="/Home.html"   underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          > <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />Anasayfa</Link >
      {selectedMarka && <Link onClick={handleTopBreadClick} underline="hover" href="#"   color="inherit" id="">Markalar</Link >}
      {selectedMarka && <Link onClick={handleTopBreadClick} underline="hover" href="#"   color="inherit">{selectedMarka}</Link >}
      {selectedSubcategory && <Typography  color="inherit">{selectedSubcategory}</Typography >}

    </Breadcrumbs>
    </Container>
  )
}
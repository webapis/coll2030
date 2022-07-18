import React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/breadcrumbSlice'
import { Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
export default function BreadcrumbsContainer(props) {
  const { selectedMarka, selectedSubcategory } = useSelector(state => state.maintab)
  const dispatch = useDispatch()
  function handleCategoryClick() {


  }

  function handleTopBreadClick() {

  }

  return (
    <Container sx={{display:'flex', justifyContent:'space-between'}}>
      <Link href="#">
        MODABURADA
      </Link>
      <div>
      <IconButton>
        <SearchIcon />
      </IconButton>
      </div>
  

    </Container>
  )
}
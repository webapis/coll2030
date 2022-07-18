import React from 'react';


import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';

import SearchBox from './SearchBox';
export default function BreadcrumbsContainer(props) {

  return (
    <Container sx={{display:'flex', justifyContent:'space-between'}}>
      <Link href="#">
        MODABURADA
      </Link>
      <div>
      <SearchBox/>
      </div>
  

    </Container>
  )
}
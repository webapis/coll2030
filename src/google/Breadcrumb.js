import React from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';

export default function BreadcrumbsContainer(props) {



  return (
    <Container sx={{display:'flex', justifyContent:'space-between'}}>
      <div style={{display:'flex'}}>
      <Avatar  src='./home-logo/eco_systemedic_leaf.svg' sx={{marginRight:2}}/>
      <Typography variant="h5"  component="div" sx={{color:'#33691e'}}>
        MODABURADA
      </Typography>
      </div>
    
      <div>
      <IconButton variant="outlined">
        <SearchIcon />
      </IconButton>
      </div>
  

    </Container>
  )
}
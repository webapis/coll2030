import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from '../App';
export default function AppBarContainer() {

    return (

<AppContext.Consumer>
{(({toggleDrawer})=>{
  return  <AppBar color="" position='static'>
  <Toolbar>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={toggleDrawer}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" component="div">
      MODABURADA
    </Typography>
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Toolbar>

</AppBar>
})}

</AppContext.Consumer>
   

    
   
    )
}

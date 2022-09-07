import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import  Button  from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home'
import { AppContext } from '../App';

export default function AppBarContainer() {

  return (

    <AppContext.Consumer>
      {(({ toggleDrawer, toggleFilterDrawer, matchedesktop, clearSubcategory }) => {
        return <AppBar color="" position='static'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={clearSubcategory}
            >
              <HomeIcon />
            </IconButton>
            <Button variant="text" onClick={clearSubcategory} color="inherit">     <Typography variant="h6" component="div"    >
              MODABURADA
            </Typography> </Button>







          </Toolbar>

        </AppBar>
      })}

    </AppContext.Consumer>




  )
}

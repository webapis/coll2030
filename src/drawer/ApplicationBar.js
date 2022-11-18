import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import TabContainer from './TabContainer';
import Container from '@mui/material/Container';
import { AppContext } from '../App';
import SearchBox from './SearchBox';
import HorizontalCatNavigation from './HorizontalCatNavigation';
import HorizontalKeywords from './HorizontalKeywords'

export default function AppBarContainer() {

  return (

    <AppContext.Consumer>
      {(({ clearSubcategory, products, navKeywords }) => {
        return <AppBar color="" position='fixed' elevation={0} >
          <div>

            <Container sx={{ display: 'flex', justifyContent: 'space-between' }} center>
              <div>
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
                  BİRARADAMODA
                </Typography> </Button>
              </div>

              {navKeywords && navKeywords.length > 0 && ([<TabContainer />, <SearchBox />])}



            </Container>


          </div>
          {/* {navKeywords && navKeywords.length === 0 && <HorizontalCatNavigation />} */}

          <HorizontalKeywords />
       


        </AppBar>
      })}

    </AppContext.Consumer>




  )
}

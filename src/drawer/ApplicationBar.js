import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { AppContext } from '../App';

import { Toolbar } from '@mui/material';
import HorizontalKeywords from './HorizontalKeywords'

export default function AppBarContainer() {

  return (

    <AppContext.Consumer>
      {(({ clearSubcategory, products, navKeywords, setSelectedNavIndex, selectedKeywords, toggleFilterDrawer, matchedesktop }) => {
        return <AppBar color="" position='fixed' elevation={0} >
          <div>



            <Toolbar sx={{ display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>

              <Container center className='brend-container' sx={{display:{xs:'block',sm:'block',md:'flex',lg:'flex'}}} >


                <Box sx={{flex:1}}>
                  {!matchedesktop && navKeywords && navKeywords.length>0&&<IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"

                    onClick={toggleFilterDrawer}
                  >
                    <MenuIcon />
                  </IconButton>}
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"

                    onClick={clearSubcategory}
                  >
                    <HomeIcon />
                  </IconButton>
                  <Button variant="text" onClick={clearSubcategory} color="inherit">     <Typography variant="h6" component="div"    >
                    BİRARADAMODA
                  </Typography> </Button>

                  <Typography variant='h1' style={{ fontSize: 14, textTransform: 'capitalize', opacity: 0.7, marginTop: -10 }}>İstediğin Kadın Marka Giyimleri Tek Yerde Hızlı Ara ve Bul</Typography>
                </Box>
                <div>
                {navKeywords && navKeywords.length > 0 && <HorizontalKeywords  />}
                </div>
            
              </Container>

            </Toolbar>


            {products.length > 0
              && <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-around', paddingBottom: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'start' }}>
                  {selectedKeywords.map((m, i) => {
                    const { index, keyword } = m
                    debugger
                    return <Chip color='info' key={i + '-'} label={m.keyword} onDelete={() => setSelectedNavIndex({ index, keyword })} size="small" />
                  })}
                </div>


              </div>
            }





          </div>






        </AppBar>
      })}

    </AppContext.Consumer>




  )
}

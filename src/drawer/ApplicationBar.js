import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { AppContext } from '../App';
import ResponseComponent from './ResponseComponent';
import { Link, Toolbar } from '@mui/material';
import HorizontalKeywords from './HorizontalKeywords'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import SearchBox from './SearchBox'
export default function AppBarContainer() {

  return (

    <AppContext.Consumer>
      {(({ groupName, subcatTitle, clearSubcategory, products, navKeywords, setSelectedNavIndex, selectedKeywords, toggleFilterDrawer, availableProducts }) => {
        return <AppBar color="" position='fixed' elevation={0} id="navbar">
          <div>



            <Toolbar sx={{ display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>

              <Container className='brend-container' sx={{ display: { xs: 'block', sm: 'block', md: 'flex', lg: 'flex' } }} >


                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'start' }}>
                  {navKeywords && navKeywords.length > 0 && <ResponseComponent maxWidth={700} render={() => {
                    return <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"

                      onClick={toggleFilterDrawer}
                    >
                      <MenuIcon />
                    </IconButton>
                  }} />}

                  <div style={{ paddingTop: 10, display: 'flex', width: '100%' }}>
                    <Typography variant="h6" component="div" style={{ flex: 1 }}>

                      BİRARADAMODA
                      <Typography style={{ fontSize: 14, lineHeight: 0.5, marginLeft: 2, flex: 4, opacity: 0.7 }}>Kadın Marka Giyimleri</Typography>
                    </Typography>

                  </div>

                </Box>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 4 }}>
                  {navKeywords && navKeywords.length > 0 && <HorizontalKeywords />}
                  {products && products.length > 0 && <Box sx={{ display: 'flex', width: '100%', flexDirection: { xs: 'column', sm: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>

                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                      <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"

                        onClick={clearSubcategory}
                      >
                        <HomeIcon />
                      </IconButton>
                      <Link color="inherit" underline="hover" onClick={clearSubcategory}>{groupName}</Link>
                      <Link color="inherit" underline="none">{subcatTitle}</Link>
                    </Breadcrumbs>
                    <Typography sx={{ textAlign: 'end', opacity: 0.5 }}>Toplam: {availableProducts} Ürün bulundu</Typography>
                  </Box>}
                
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

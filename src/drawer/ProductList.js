
import React from 'react';

import Grid from '@mui/material/Grid'
import ImageComponent from './imageComponent';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AppContext } from '../App';
import { Typography } from '@mui/material';
import SearchBox from './SearchBox'
import ImageList from '@mui/material/ImageList';
export default function ProductList(props) {




  return (
    <AppContext.Consumer>
      {({ fetchingProducts, products, selectedSubcategory, availableProducts, setSelectedNavIndex, selectedKeywords }) => {
        return <div style={{ position: 'relative' }}>

          <div style={{ display: fetchingProducts ? 'block' : 'none', width: '100%', height: '100vh', backgroundColor: '#fafafa', position: 'absolute', top: 0, bottom: 0, zIndex: 10, opacity: 0.7, color: 'white' }}>  <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress color="inherit" />
          </Box></div>

          <Container sx={{ paddingLeft: 0, marginTop: 2 }}>
            {products.length > 0
              && <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'start' }}>
                  {selectedKeywords.map((m, i) => {
                    const { index, keyword } = m

                    return <Chip key={i} label={m.keyword} onDelete={() => setSelectedNavIndex({ index, keyword })} />
                  })}
                </div>
                <div></div>
                <SearchBox /></div>
            }

            {products.length > 0 && <Typography sx={{ color: '#757575' }}>toplam:{availableProducts} ürün bulundu</Typography>}
            <Box sx={{ width: '100%',height:'100vh', overflowY: 'scroll' }}>
              <ImageList variant="standard" cols={5} gap={8}>
                {products.length > 0 && products.map((item, i) => {

                  return <ImageComponent selectedSubcategory={selectedSubcategory && selectedSubcategory.subcategory} plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} timestamp={item.timestamp} price={item.priceNew} />




                })}
              </ImageList>

            </Box>
            {products.length > 0 && <Fab variant="extended" sx={{ position: 'fixed', bottom: 55, right: 5, fontSize: 10 }} color="" >
              {products.length - 1}/{availableProducts}
            </Fab>}


            <Fab id="nav-top-btn" variant="extended" sx={{ position: 'fixed', bottom: 5, right: 5, display: 'none' }} color="primary" onClick={() => { window.scrollTo({ top: 0 }); }}>
              <NavigationIcon />
            </Fab>
            {products.length > 0 && (products.length - 1) === availableProducts && <Typography sx={{ color: '#757575', marginBottom: 10 }}>toplam:{availableProducts}ürün görüntilendi</Typography>}
          </Container>
        </div>
      }}
    </AppContext.Consumer>

  );
}



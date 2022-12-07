
import React from 'react';


import ImageComponent from './imageComponent';

import Chip from '@mui/material/Chip';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
import HorizontalNavKey from './HorizontalNavKey'
import Box from '@mui/material/Box';
import { AppContext } from '../App';
import { Typography } from '@mui/material';
import SearchBox from './SearchBox'
import Grid from '@mui/material/Grid';
//import ProdImageIndex from './ProdImageIndexes';
import ResponseComponent from './ResponseComponent';
export default function ProductList() {




  return (
    <AppContext.Consumer>
      {({searchInputVisible, indexTabName, subcatTitle, indexTab, products, selectedSubcategory, availableProducts, setSelectedNavIndex, selectedKeywords, productImgIndexes, navKeywords, selectedNavIndex, selectedFiterTab }) => {
        return <div style={{ position: 'relative' }}>


          <div style={{ paddingTop: 3 }}>
            {products.length > 0
              && <div style={{ position: 'relative' }}>
                <div >
                  {selectedKeywords.map((m, i) => {
                    const { index, keyword } = m
                    return <Chip key={i} label={m.keyword} onDelete={() => setSelectedNavIndex({ index, keyword })} size="small" />
                  })}
                </div>


              </div>
            }


            <div >
            <ResponseComponent minWidth={701}render={()=>(<Grid item xs={12} sx={{display:'flex', justifyContent:'flex-end', marginTop:{md:10}}}><SearchBox/></Grid>)}/>
                  {searchInputVisible &&   <Grid item xs={12} sx={{display:'flex', justifyContent:'flex-end',marginTop:20}}><SearchBox/></Grid> }
                  {products.length>0 && productImgIndexes && <Grid item xs={12} sx={{marginTop:{xs:20,md:1}}}><HorizontalNavKey productImgIndexes={productImgIndexes}/></Grid>}
              {/* {productImgIndexes && indexTab !== 0 && <ProdImageIndex subcatTitle={subcatTitle} indexTabName={indexTabName} selectedNavIndex={selectedNavIndex} setSelectedNavIndex={setSelectedNavIndex} productImgIndexes={productImgIndexes} navKeywords={navKeywords} />} */}
              <Box sx={{ width: '100%', overflowY: 'auto', marginTop: { xs: 1, sm: 10, md: 5 } }} id="product-container">
                <Grid container gap={1} sx={{ display: 'flex', justifyContent: {xs:'center',md:'end'} }}>
                 
                

                  {/* {products.length > 0 && indexTab===0 &&  <Grid item  xs={12} sm={12} md={12}><Typography sx={{textAlign:'end', opacity:0.5}}>Toplam: {availableProducts} Ürün bulundu</Typography></Grid>} */}
                  {products.length > 0 && products.map((item, i) => {

                    return <Grid key={i} item xs={5} sm={2} md={2} sx={{ display: 'flex', justifyContent: 'center' }}> <ImageComponent key={i + "-"} selectedSubcategory={selectedSubcategory && selectedSubcategory.subcategory} plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} timestamp={item.timestamp} price={item.priceNew} /></Grid>
                  })}
                </Grid>

              </Box>
            </div>
            {products.length > 0 && <Fab variant="extended" sx={{ position: 'fixed', bottom: 55, right: 5, fontSize: 10 }}  >
              {products.length - 1}/{availableProducts}
            </Fab>}


            <Fab id="nav-top-btn" variant="extended" sx={{ position: 'fixed', bottom: 5, right: 5, display: 'none' }} color="primary" onClick={() => { document.getElementById('product-container').scrollTo({ top: 0 }); window.scrollTo({ top: 0 }) }}>
              <NavigationIcon />
            </Fab>
            {products.length > 0 && (products.length - 1) === availableProducts && <Typography sx={{ color: '#757575', marginBottom: 10 }}>toplam:{availableProducts}ürün görüntilendi</Typography>}
          </div>
        </div>
      }}
    </AppContext.Consumer>

  );
}



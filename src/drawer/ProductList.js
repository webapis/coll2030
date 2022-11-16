
import React from 'react';


import ImageComponent from './imageComponent';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';

import Box from '@mui/material/Box';
import { AppContext } from '../App';
import { Typography } from '@mui/material';
import SearchBox from './SearchBox'
import ImageList from '@mui/material/ImageList';
import TabContainer from './TabContainer';
import ProdImageIndex from './ProdImageIndexes';
export default function ProductList(props) {




  return (
    <AppContext.Consumer>
      {({ products, selectedSubcategory, availableProducts, setSelectedNavIndex, selectedKeywords, productImgIndexes, navKeywords, selectedNavIndex, selectedFiterTab }) => {
        return <div style={{position:'relative'}}>


          <Container sx={{ paddingLeft: 0, paddingTop:10 }}>
            {products.length > 0
              && <div style={{position:'relative'}}>
                <div >
                  {selectedKeywords.map((m, i) => {
                    const { index, keyword } = m
                    return <Chip key={i} label={m.keyword} onDelete={() => setSelectedNavIndex({ index, keyword })} />
                  })}
                </div>
                <Container id="navbar" style={{position:'fixed',top:63,width:'100%',color:'inherit',backgroundColor:'inherit'}}>
                  <TabContainer />
                  <div style={{display:'flex' }}>
                  <div>
                  <Typography sx={{ color: '#757575',opacity:'0.7', marginTop:2}}>toplam:{availableProducts} ürün bulundu</Typography>
                  </div>
                  
                   
                  </div>

                </Container>

              </div>
            }

            {false && <Typography sx={{ color: '#757575' }}>toplam:{availableProducts} ürün bulundu</Typography>}
            <div >

         
            {productImgIndexes && selectedFiterTab === 0 && <ProdImageIndex selectedNavIndex={selectedNavIndex} setSelectedNavIndex={setSelectedNavIndex} productImgIndexes={productImgIndexes} navKeywords={navKeywords} />}
            <Box sx={{ width: '100%', overflowY: 'scroll' }} id="product-container">
              <ImageList variant="standard" cols={5} gap={8}>
                {products.length > 0 && selectedFiterTab === 1 && products.map((item, i) => {

                  return <ImageComponent key={i + "-"} selectedSubcategory={selectedSubcategory && selectedSubcategory.subcategory} plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} timestamp={item.timestamp} price={item.priceNew} />
                })}
              </ImageList>

            </Box>
            </div>
            {products.length > 0 && <Fab variant="extended" sx={{ position: 'fixed', bottom: 55, right: 5, fontSize: 10 }}  >
              {products.length - 1}/{availableProducts}
            </Fab>}


            <Fab id="nav-top-btn" variant="extended" sx={{ position: 'fixed', bottom: 5, right: 5, display: 'none' }} color="primary" onClick={() => { document.getElementById('product-container').scrollTo({ top: 0 }); window.scrollTo({ top: 0 }) }}>
              <NavigationIcon />
            </Fab>
            {products.length > 0 && (products.length - 1) === availableProducts && <Typography sx={{ color: '#757575', marginBottom: 10 }}>toplam:{availableProducts}ürün görüntilendi</Typography>}
          </Container>
        </div>
      }}
    </AppContext.Consumer>

  );
}



import * as React from 'react';

import { Container, Typography } from '@mui/material';

import HorizontalNav from './HorizontalNav';
import Chip from '@mui/material/Chip';
export default function CategoryNavContainer({ subcategories, products, fetchingProduct, selectSubcategory }) {



  return products.length === 0 && !fetchingProduct && <Container sx={{ marginTop: 5 }}>
    {subcategories.sort(function (a, b) {


      return b[1].length - a[1].length;
    }).filter((f)=>f[0]!=='diger').map((m, b) => {
      const groupName = m[0]
      const images = m[1]
      let totalGroup=images.reduce((prev,curr)=>{
        return prev+curr.count
      },0)


      return <div key={b}>
        <div style={{display:'flex', justifyContent:'center',paddingTop:25}}>
         < Typography variant="h5" gutterBottom textAlign='center'>{groupName}  <Chip style={{opacity:0.6,fontSize:12}} size="small"  label={new Intl.NumberFormat().format(totalGroup)+' ürün'}/></Typography>
       
        </div>
      
          <HorizontalNav   navitems={images} m={m} selectSubcategory={selectSubcategory}/>
      </div>

    })}
  </Container>




}






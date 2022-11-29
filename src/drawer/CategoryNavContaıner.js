import * as React from 'react';

import {  Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import HorizontalNav from './HorizontalNav';
import Chip from '@mui/material/Chip';
export default function CategoryNavContainer({ subcategories, products, fetchingProduct, selectSubcategory }) {



  return products.length === 0 && !fetchingProduct && <Grid container sx={{ marginTop: 5 }}>
    {subcategories.filter((f)=>f[0]!=='diger').map((g)=>{
      const groupName = g[0]
      const images = g[1]
      let totalGroup=images.reduce((prev,curr)=>{
        return prev+curr.count
      },0)
      return {groupName,images:images.sort((a,b)=>b.count-a.count),totalGroup}
    }).sort((a,b)=>{
  
     return b.totalGroup-a.totalGroup}).map((m, b) => {
      const {groupName,images,totalGroup} = m
  


      return[ <Grid item xs={0} sm={1} md={3} key={b+'a'}></Grid>, <Grid item xs={12} sm={10} md={6}   key={b+'b'}>
        <div style={{display:'flex', justifyContent:'center',paddingTop:25}}>
         < Typography variant="h2" style={{fontSize:20}} gutterBottom textAlign='center'>{groupName}  <Chip style={{opacity:0.6,fontSize:12}} size="small"  label={new Intl.NumberFormat().format(totalGroup)+' ürün'}/></Typography>
       
        </div>
      
          <HorizontalNav   navitems={images} m={m} selectSubcategory={selectSubcategory}/>
      </Grid>,
       <Grid item xs={0} sm={1} md={3} key={b+'c'}></Grid>
      ]
    })}
  </Grid>




}






import * as React from 'react';

import placeholders from './imageComponent/placeholders';
import { Container, Typography } from '@mui/material';


export default function CategoryNavContainer({ subcategories, products, fetchingProduct, selectSubcategory }) {



  return products.length === 0 && !fetchingProduct && <Container sx={{ marginTop: 12 }}>
    {subcategories.sort(function (a, b) {
      
      debugger
    return b[1].length - a[1].length;
}).map((m,b) => {
      const groupName = m[0]
      const images = m[1]
      debugger
 

      return <div key={b} >
        <Typography variant="h5" gutterBottom textAlign='center'>{groupName}</Typography>
        <div style={{display:'flex',flexWrap:'nowrap',overflowX:'auto',padding:4}}>
        {images.map((m,i) => {

          if (m.imageUrls) {

            const { imageUrls: { marka, src, title }, title: keyword } = m
            debugger
            const imageSource = placeholders[marka].imagePrefix.trim() + placeholders[marka].imageHost.trim() + src + placeholders[marka].imgPostFix

            return <div key={i} style={{display:'flex',flexDirection:'column'}}><img onClick={()=>selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType?m.keywordType:'category' })} style={{borderRadius:6, marginRight:4}} height={180} src={imageSource} alt={title} /><span style={{fontSize:10,opacity:0.7}}>{keyword}</span></div>
          }



        })}</div>
</div>

    })}
  </Container>




}





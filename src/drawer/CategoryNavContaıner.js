import * as React from 'react';

import placeholders from './imageComponent/placeholders.json';
import { Container, Typography } from '@mui/material';


export default function CategoryNavContainer({ subcategories, products, fetchingProduct, selectSubcategory }) {



  return products.length === 0 && !fetchingProduct && <Container sx={{ marginTop: 5 }}>
    {subcategories.sort(function (a, b) {


      return b[1].length - a[1].length;
    }).map((m, b) => {
      const groupName = m[0]
      const images = m[1]



      return <div key={b} >
        <Typography variant="h5" gutterBottom textAlign='center'>{groupName}</Typography>
        <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', padding: 0 }}>
          {images.map((m, i) => {
            debugger
            if (m.imageUrls) {

              const { imageUrls, title: keyword } = m
              const { marka, src, title } = imageUrls[0]
              const classname = '_' + src.substring(src.lastIndexOf('/') + 1, src.indexOf('.jpg')).replace(/\./g, '')

              debugger
              const imageSource = placeholders[marka].imagePrefix.trim() + placeholders[marka].imageHost.trim() + src + placeholders[marka].imgPostFix

              return <div key={i} style={{ display: 'flex', flexDirection: 'column' }}><span className={classname} onClick={() => selectSubcategory({ functionName: m.functionName, index: m.index, groupName: m.groupName, keywordType: m.keywordType ? m.keywordType : 'category' })} style={{ borderRadius: 6, marginRight: 4 }} height={180} ></span><span style={{ fontSize: 10, opacity: 0.7 }}>{keyword}</span></div>
            }
            return null



          })}</div>
      </div>

    })}
  </Container>




}





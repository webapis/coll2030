import * as React from 'react';

import { Container, Typography } from '@mui/material';

import HorizontalNav from './HorizontalNav';

export default function CategoryNavContainer({ subcategories, products, fetchingProduct, selectSubcategory }) {



  return products.length === 0 && !fetchingProduct && <Container sx={{ marginTop: 5 }}>
    {subcategories.sort(function (a, b) {


      return b[1].length - a[1].length;
    }).filter((f)=>f[0]!=='diger').map((m, b) => {
      const groupName = m[0]
      const images = m[1]



      return <div key={b}>
          <Typography variant="h5" gutterBottom textAlign='center'>{groupName}</Typography>
          <HorizontalNav navitems={images} m={m} selectSubcategory={selectSubcategory}/>
      </div>

    })}
  </Container>




}






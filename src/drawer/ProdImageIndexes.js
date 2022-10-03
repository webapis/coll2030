import * as React from 'react';
import { Grid } from '@mui/material';
export default function ProdImageIndex({ productImgIndexes,setSelectedNavIndex }) {


    const imgIndex = Object.entries(productImgIndexes)

    return imgIndex.map(m => {
        const groupName = m[0]
        const groupItems = m[1]

        return <Grid container>{groupName}
        <Grid item container>
        {groupItems.map(m => {
            const {index,keyword}=m
                console.log('m-',m)
                return<Grid item><img onClick={()=>setSelectedNavIndex({index,keyword})} width="100" src={m.imageSrc} alt={keyword}/><span>{m.keyword}</span></Grid>
            })}
        </Grid>
       
        </Grid>
    })
  

}
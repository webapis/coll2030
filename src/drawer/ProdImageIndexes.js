import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import Badge from '@mui/material/Badge';
export default function ProdImageIndex({ productImgIndexes,setSelectedNavIndex }) {


    const imgIndex = Object.entries(productImgIndexes)

    return imgIndex.map(m => {
        const groupName = m[0]
        const groupItems = m[1]

        return <Grid container>
        <Grid item xs={12} sx={{backgroundColor:'#cfd8dc',marginTop:5,marginBottom:2}}><Typography variant="button" display="block">{groupName}</Typography> </Grid>
        <Grid item container>
        {groupItems.map(m => {
            const {index,keyword,title,productName,total}=m
                console.log('m-',m)
                return<Grid   md={2} item sx={{display:'flex',flexDirection:'column',width:200}}><Badge max={999} color='info' badgeContent={total} anchorOrigin={{vertical: 'top', horizontal: 'left'}}><img style={{borderRadius:25}} onClick={()=>setSelectedNavIndex({index,keyword})} width="100" src={m.imageSrc} alt={keyword}/></Badge><Tooltip title={title} placement="top"><Typography variant="caption" display="block" gutterBottom>{keyword} {productName}</Typography></Tooltip></Grid>
            })}
        </Grid>
       
        </Grid>
    })
  

}
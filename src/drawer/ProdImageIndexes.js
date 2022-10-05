import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
export default function ProdImageIndex({ productImgIndexes,setSelectedNavIndex }) {

    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
let imageWidth =0

    switch (true) {
        case xs === true:
    imageWidth=80
    break;
        case sm === true:
            imageWidth=80
            break;
        case md === true:
            imageWidth=100
            break;
        case lg === true:
            imageWidth=100
            break;
        default:
            imageWidth=100
            break;
    }
    const imgIndex = Object.entries(productImgIndexes)


debugger

    return<Container sx={{paddingRight: 0}} center>
         
        {  imgIndex.map(m => {
   debugger
        const groupItems = m[1]

        const groupName =m[0]
        return<Grid container >
            <Grid item xs={12} sx={{backgroundColor:'#cfd8dc',marginTop:5,marginBottom:2}}><Typography variant="button" display="block">{groupName}</Typography> </Grid>
            {groupItems.map(m => {
            const {index,keyword,title,productName,total}=m
         
                return<Grid xs={4} sm={2}  item sx={{display:'flex',flexDirection:'column'}}><Badge max={999} color='info' badgeContent={total} anchorOrigin={{vertical: 'top', horizontal: 'left'}}><img style={{borderRadius:25,width:imageWidth}} onClick={()=>setSelectedNavIndex({index,keyword})} width="100" src={m.imageSrc} alt={keyword}/></Badge><Tooltip title={title} placement="top"><Typography variant="caption" display="block" gutterBottom>{keyword} {productName}</Typography></Tooltip></Grid>
            })}</Grid> 
       
       
       
    })
}
</Container>

  

}


import * as React from 'react';

import CollectedDataBySubcatDrawer from './CollectedDataBySubcatDrawer';
import { useSelector } from 'react-redux';
import Bar from '../Bar'
import { Grid } from '@mui/material';

import data from '../reports/updated/by-subcategory-deleted.json'

export default function BySubcategoryDeleted() {
const {selectedMarka,subcategories} =useSelector(state=>state.main)
const dataarray =Object.entries(subcategories)//.map(m=>{return {date:m[0],total:m[1]}})


    return <div style={{  marginTop:100,display:'flex' }}>
    
    <Grid container>
        {dataarray.map(m=>{
            const subcategory=m[0]
            const content =Object.entries( m[1]['data']).map(m=>{return {date:m[0],total:m[1]}})
        
            return <Grid item>
           
                <Bar data={content} label={selectedMarka +' '+subcategory}/></Grid>
        })}

        </Grid>
   
       <CollectedDataBySubcatDrawer data={data}/>
    </div>
}


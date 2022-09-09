

import * as React from 'react';

import CollectedDataBySubcatDrawer from './CollectedDataBySubcatDrawer';
import { useSelector } from 'react-redux';
import Bar from '../Bar'
import { Typography } from '@mui/material';
debugger

export default function BySubcategory() {
const {selectedMarka,subcategories} =useSelector(state=>state.main)
const dataarray =Object.entries(subcategories)//.map(m=>{return {date:m[0],total:m[1]}})

debugger
    return <div style={{ width: 300, marginTop:100 }}>
        <div>{selectedMarka}</div>
        {dataarray.map(m=>{
            const subcategory=m[0]
            const content =Object.entries( m[1]['data']).map(m=>{return {date:m[0],total:m[1]}})
            debugger
            return <div>
                <Typography>{subcategory}</Typography>
                <Bar data={content}/></div>
        })}
   <CollectedDataBySubcatDrawer/>
    </div>
}


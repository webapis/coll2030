
import * as React from 'react';

import { useSelector } from 'react-redux';

import TotalCollected from './collected-reports/TotalCollected'
import ByBrand  from './collected-reports/ByBrand'
import BySubcategory from './collected-reports/BySubcategory';
import SubcategoryPie from './collected-reports/SubcategoryPie';
import { Typography } from '@mui/material';
import  Container from '@mui/material/Container'
export default function App(){
const {collectedReport} =useSelector(state=>state.main)
 return <Container> 
    <Typography variant='h4'>{collectedReport}</Typography>
    {collectedReport==='Total' && <TotalCollected/> }
 {collectedReport==='By Brand' && <ByBrand/> }
 {collectedReport==='By Category' && <BySubcategory/> }
 {collectedReport==='Subcategory Pie' && <SubcategoryPie/> }
 </Container> 

}

//'Total', 'By Brand', 'By Category'
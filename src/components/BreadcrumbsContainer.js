import React from 'react';
import {useSelector} from 'react-redux'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
export default function BreadcrumbsContainer(){
const {navCategory,marka,category,subcategory} =useSelector(state=>state.breadcrumb)

    return (
        <Breadcrumbs aria-label="breadcrumb">
        {navCategory && <Link underline="hover" href="#" fontSize="small" color="#9e9e9e">{navCategory}</Link >}
        {marka && <Link underline="hover" href="#" fontSize="small" color="#9e9e9e">{marka}</Link >}
        {category && <Link underline="hover" href="#" fontSize="small" color="#9e9e9e">{category}</Link >}
        {subcategory && <Link underline="hover" href="#" fontSize="small" color="#9e9e9e">{subcategory}</Link >}

      </Breadcrumbs>
    )
}
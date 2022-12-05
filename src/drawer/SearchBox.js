import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { AppContext } from '../App';

export default function SearchBox() {



  return (
    <AppContext.Consumer>{({  searchInputChanged, searchProduct, search }) => {
      return <Paper
      elevation={0}
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
      >

        <InputBase
          sx={{ ml: 1, flex: 10 }}
          placeholder={"Ürün ara"}
          type="search"
          inputProps={{ 'aria-label': 'search google maps' }} onChange={(e)=>{
          const {value}=e.target
          if(value===''){
            // const {subcategory, totalSubcategory, node}= selectedSubcategory
            // 
            // selectSubcategory({subcategory, totalSubcategory, node})
          } else{

            searchInputChanged(e)
          } 
       
          
          }} value={search} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchProduct()
            } else{
              
            }
          }}
        />

        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchProduct} >
          <SearchIcon />
        </IconButton>
   


      </Paper>
    }}</AppContext.Consumer>

  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AppContext } from '../App';

export default function SearchBox() {



  return (
    <AppContext.Consumer>{({ toggleFilterDrawer, matchedesktop, selectedSubcategory, searchInputChanged, searchProduct, search,selectSubcategory }) => {
      return <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >

        <InputBase
          sx={{ ml: 1, flex: 10 }}
          placeholder={selectedSubcategory.subcategory.toUpperCase() + " ara".toUpperCase()}
          type="search"
          inputProps={{ 'aria-label': 'search google maps' }} onChange={(e)=>{
          const {value}=e.target
          if(value===''){
            // const {subcategory, totalSubcategory, node}= selectedSubcategory
            // debugger
            // selectSubcategory({subcategory, totalSubcategory, node})
          } else{

            searchInputChanged(e)
          } 
       
          
          }} value={search} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchProduct()
            } else{
              debugger
            }
          }}
        />

        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchProduct} >
          <SearchIcon />
        </IconButton>
        {!matchedesktop && <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={toggleFilterDrawer}>
          <FilterListIcon />
        </IconButton>}


      </Paper>
    }}</AppContext.Consumer>

  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AppContext } from '../App';
export default function SearchBox() {



  return (
    <AppContext.Consumer>{({ toggleFilterDrawer }) => {
      return <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Ürün ara"
          inputProps={{ 'aria-label': 'search google maps' }}
        />

        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={toggleFilterDrawer}>
          <FilterListIcon />
        </IconButton>


      </Paper>
    }}</AppContext.Consumer>

  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { actions } from '../store/accordionSlice';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function SearchBox() {
  const matchedesktop = useMediaQuery('(min-width:600px)');
  const dispatch =useDispatch()
  
  function showFilter(e){
    e.preventDefault()
    dispatch(actions.setDisplayFilter(true))
  }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:'100%' }}
    >

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Ürün ara"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
   
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {!matchedesktop &&    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={showFilter}>
        <FilterListIcon />
      </IconButton>}
   
 
    </Paper>
  );
}

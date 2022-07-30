import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
export default function SearchBox() {
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
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <FilterListIcon />
      </IconButton>
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <ViewComfyIcon />
      </IconButton>
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <ViewModuleIcon />
      </IconButton>
    </Paper>
  );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../store/breadcrumbSlice'

export default function SearchInput() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.breadcrumb.search)
  function handleOnInput(e) {
    const { value } = e.target
    
    dispatch(actions.setSearchText(value))
  }

  function handleClick() {
    dispatch(actions.searchText())
  }

  return (
    <Container center sx={{ display: 'flex' }}>

      <TextField fullWidth size="small" onInput={handleOnInput} value={search} />
      <Button sx={{ marginLeft: -8 }} variant='outlined' onClick={handleClick}>Ara</Button>
    </Container>
  );
}
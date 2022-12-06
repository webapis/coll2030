import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import { Button } from '@mui/material';
import { AppContext } from '../App';

export default function SearchBox() {



  return (
    <AppContext.Consumer>{({  searchInputChanged, searchProduct, search }) => {
      return <Paper
      elevation={1}
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:{xs:'100%',md:'50%'} }}
      >

        <InputBase
          sx={{ ml: 1, flex: 10 }}
          placeholder={"Ürün ara"}
          type="search"
          inputProps={{ 'aria-label': 'search google maps' }} onChange={(e)=>{
          const {value}=e.target
          if(value===''){

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

        <Button disabled={search===''} type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchProduct} >
          Ara
        </Button>
   


      </Paper>
    }}</AppContext.Consumer>

  );
}

import * as React from 'react';


import { Container, Typography } from '@mui/material';
import SubcategoryCard from './SubcategoryCard';
import { useTheme } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import useMediaQuery from '@mui/material/useMediaQuery';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
export default function CategoryNavContainer({ subcategories, products, fetchingProduct, selectSubcategory }) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));

  function render(size) {

    return products.length === 0 && !fetchingProduct && <Container sx={{ marginTop: 10 }}>
      <Typography align="center" variant="h5">Biraradamoda</Typography>
      <SearchProductCategory subcategories={subcategories}  selectSubcategory={selectSubcategory}/>
      <ImageList cols={size}
        variant="masonry"
      >
        {subcategories.map((item, i) => {
          const indexes = item[1]

          return <div > <SubcategoryCard selectSubcategory={selectSubcategory} indexes={indexes} /></div>
        })}
      </ImageList >
    </Container>
  }

  switch (true) {
    case xs === true:
      return render(1)
    case sm === true:
      return render(1)
    case md === true:
      return render(3)
    case lg === true:
      return render(6)
    default:
      return render(6)
  }


}




function SearchProductCategory({ subcategories, selectSubcategory }) {
  const [state, setState] = useState()
  const flatten = Object.values(subcategories.map(m => m[1])).flat()

  function handleInputChange(event, value) {

    const findSelectedObj = flatten.find(f => {
      return f.title === value
    })

    setState(findSelectedObj)
    debugger
    

  }
  debugger
  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <Autocomplete
        sx={{ width: 500 }}
        id="free-solo-demo"
        inputValue=''
        onInputChange={handleInputChange}
        options={flatten.map((option) => option.title)}
        renderInput={(params) => <div style={{ display: 'flex' }}><TextField {...params} label="Ürün kategorileri" /><Button variant="outlined" onClick={()=>selectSubcategory({functionName:state.functionName,index:state.index})}>Ara</Button></div>}
      />


    </div>
  );
}
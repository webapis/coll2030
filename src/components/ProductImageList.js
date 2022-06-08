
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
//import IntersectionObserver from "../intersectObserver";
import ImageComponent from './imageComponent';
import CircularProgress from '@mui/material/CircularProgress';
import { actions } from '../store/breadcrumbSlice'
import Button from '@mui/material/Button';



export default function ProductImageList(props) {

  const { selectedMarka, selectedSubcategory, selectedCategory, totalFetchedProducts, subCatTotal, fetching, products, selectedRegex, search } = useSelector(state => state.breadcrumb)
debugger;
  const dispatch = useDispatch()


  useEffect(() => {
    localStorage.setItem('page', 1)
    fetchData(1)


  }, []);

  useEffect(() => {
    // if (state.length > 0) {
    //   let items = document.querySelectorAll(".figure[data-intersection=true]");

    //   const onIntersect = (bool, entry) => {
    //     entry.target.src = entry.target.dataset.src;


    //   };

    //   const intersectObserver = new IntersectionObserver({
    //     items,
    //     callback: onIntersect,
    //     threehold: 0.5,
    //     triggerOnce: false
    //   });
    // }


  }, [])

  async function fetchData(page) {


    const url = `/api/kadin/data?page=${page}&subcatregex=${selectedRegex}&marka=${selectedMarka}&categoryregex=${selectedCategory}&search=${search}`
    const response = await fetch(url, { cache: 'default' })

    const { data } = await response.json()

    dispatch(actions.setFetchedProductsTotal({ products: data }))
    dispatch(actions.setFetchState(false))



  }

  function fetchNextPage() {
    dispatch(actions.setFetchState(true))
    let prevPage = parseInt(localStorage.getItem('page'))
    let nextPage = prevPage + 100
    localStorage.setItem('page', nextPage)
    fetchData(nextPage)
  }

  return (

    <Grid container justifyContent="center" spacing={1} paddingTop={5}
    >
      {products.length > 0 && products.map((item, i) => {

        return <Grid item key={i} xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>

          <ImageComponent selectedSubcategory={selectedSubcategory} plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} timestamp={item.timestamp} price={item.priceNew} />

        </Grid>
      })}

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
        {products.length > 0 ? <div>{fetching ? <Box sx={{ display: 'flex' }}>
          <CircularProgress disableShrink />
        </Box> : <Button disabled={(totalFetchedProducts || fetching) >= subCatTotal} variant='outlined' onClick={fetchNextPage}>{(totalFetchedProducts)}/{subCatTotal}</Button>}</div> : <CircularProgress />}
      </Grid>
    </Grid>


  );
}



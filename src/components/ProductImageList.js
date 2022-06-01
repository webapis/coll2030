
import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid'
//import IntersectionObserver from "../intersectObserver";
import ImageComponent from './imageComponent';
import CircularProgress from '@mui/material/CircularProgress';
import {actions} from '../store/breadcrumbSlice'
import Button from '@mui/material/Button';


const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;
export default function ProductImageList(props) {
  const [state, setData] = useState([]);
  const {selectedMarka,selectedSubcategory,totalFetchedProducts,subCatTotal,fetching,products} =useSelector(state=>state.breadcrumb)
  
  const dispatch =useDispatch()
  debugger;
  let [width, setWidth] = useState(getWidth());

useEffect(()=>{
  const width =getWidth()
  


  const resizeListener = () => {
    // change width from the state object
  
    setWidth(getWidth())


  };
  window.addEventListener('resize', resizeListener);

  // clean up function
  return () => {
    // remove resize listener
    window.removeEventListener('resize', resizeListener);
  }
},[])

  useEffect(() => {
    localStorage.setItem('page', 0)
    fetchData(0)


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


  }, [state])

  async function fetchData(page) {
    dispatch(actions.setFetchState(true))
debugger;
    const url = `/api/kadin/data?page=${page}&subcategory=${selectedSubcategory}&marka=${selectedMarka}`
    const response = await fetch(url, { cache: 'default' })

    const { data } = await response.json()

    dispatch(actions.setFetchedProductsTotal({products:data}))
    dispatch(actions.setFetchState(false))
   // setData(prevState => [...prevState, ...data])


  }

  function fetchNextPage() {

    let prevPage = parseInt(localStorage.getItem('page'))
    let nextPage = prevPage + 100
    localStorage.setItem('page', nextPage)
    fetchData(nextPage)
  }

  return (

    <Grid container justifyContent="center" spacing={0} paddingTop={5}
    >
      {products.length>0 && products.map((item, i) => {

        return <Grid item key={i} xs={6} sm={4} md={3} lg={2}  sx={{ display: 'flex', justifyContent: 'center' }}>

          <ImageComponent plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} timestamp={item.timestamp} price={item.priceNew} />

        </Grid>
      })}

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
        {products.length > 0 ?<div>{fetching?<CircularProgress />:<Button disabled={(totalFetchedProducts) >=subCatTotal} variant='outlined' onClick={fetchNextPage}>{(totalFetchedProducts)}/{subCatTotal}</Button>}</div>  : <CircularProgress />}
      </Grid>
    </Grid>


  );
}



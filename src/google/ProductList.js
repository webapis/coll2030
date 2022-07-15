
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
//import IntersectionObserver from "../intersectObserver";
import ImageComponent from './imageComponent';
import CircularProgress from '@mui/material/CircularProgress';
import { actions } from '../store/accordionSlice'
import Button from '@mui/material/Button';
import placeholders from './imageComponent/placeholders';


export default function ProductList(props) {

  const { products, startAt, fetching, scrollHandled } = useSelector(state => state.accordion)
  const { selectedMarka, selectedSubcategory, totalSubcategory, selectedKeyword, selectedKeyWordTotal } = useSelector(state => state.accordion)

  //const { selectedMarka, selectedSubcategory, selectedCategory, totalFetchedProducts, subCatTotal, fetching, products, selectedRegex, search } = useSelector(state => state.products)
  const dispatch = useDispatch()



  useEffect(() => {

    window.addEventListener('scroll', function scroll() {

      if ((window.innerHeight + window.scrollY) + 2000 >= document.body.offsetHeight) {


     

        console.log('reached bottom of the page')
        // you're at the bottom of the page
      }

    })
  }, [])




  useEffect(() => {
    fetchData(startAt)
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

  function fetchData(start) {
    dispatch(actions.setFetchState(true))
    var url = '/api/kadin/data?start=' + start + '&subcategory=' + selectedSubcategory + '&marka=' + selectedMarka + '&keyword=' + selectedKeyword
    return fetch(url, { cache: 'default' }).then(function (response) { return response.json() }).then(function (data) {
      return data
    })
      .then(function (data) {
        var collection = data.data
        const fetchAllComplete = [...products, ...collection].length === totalSubcategory
        dispatch(actions.productsFetched({ products: collection, fetchAllComplete }))
      })
      .catch(function (err) {
        console.log('err', err)
        return err
      })
  }

  return (

    <Grid container justifyContent="center" spacing={1} paddingTop={5}
    >
      {products.length > 0 && products.map((item, i) => {

        return <Grid item key={i} xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>

          <ImageComponent selectedSubcategory={selectedSubcategory} plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} timestamp={item.timestamp} price={item.priceNew} />

        </Grid>
      })}


    </Grid>


  );
}



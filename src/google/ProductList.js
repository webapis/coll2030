
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid'
//import IntersectionObserver from "../intersectObserver";
import ImageComponent from './imageComponent';

import { actions } from '../store/accordionSlice'
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function ProductList(props) {


  const {  products, startAt, fetching,selectedMarka, selectedSubcategory,totalKeyword, totalSubcategory, selectedKeyword, parentKeyword, selectedKeyWordTotal, childkeywords,fetchAllComplete } = useSelector(state => state.accordion)

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
    if(fetchAllComplete===false){
      debugger
     fetchData(startAt)
    }
 
  }, [fetchAllComplete]);


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
  useEffect(() => {
    if (selectedKeyword.length > 0) {
      fetchData(startAt)
    }
  }, [selectedKeyword])

  function fetchData(start) {
    dispatch(actions.setFetchState(true))

    setTimeout(() => {
      var url = '/api/kadin/data?start=' + start + '&subcategory=' + selectedSubcategory + '&marka=' + selectedMarka + '&keyword=' + selectedKeyword + '&parentKeyword=' + parentKeyword

      return fetch(url, { cache: 'default' }).then(function (response) { return response.json() }).then(function (data) {
        return data
      })
        .then(function (data) {
          var collection = data.data
          const fetchAllComplete = [...products, ...collection].length === totalKeyword
          debugger
          dispatch(actions.productsFetched({ products: collection, fetchAllComplete }))
        })
        .catch(function (err) {
          console.log('err', err)
          return err
        })
    }, 1000)

  }

  if (fetching)
    return (

      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )

    function moveToTop(){
      document.body.scrollTop = 0;document.documentElement.scrollTop = 0;
    }
  return (

    <Grid container justifyContent="center" spacing={1} margin={0} padding={0}
    >
      <Grid item xs={6} sm={4} md={3} margin={0} padding={0}>
        <Stack direction="column" spacing={1} style={{ padding: 0 }}>
        <Fab   id="nav-top-btn" onClick={moveToTop} color="secondary" variant="extended" sx ={{ mr: 1, position:'fixed', bottom:10, right:5,display:'none' }}>
        <NavigationIcon  />
      
      </Fab>

          {childkeywords && childkeywords.filter(f => f[0] !== parentKeyword).sort(function (a, b) {

            var textA = a[0].toUpperCase();
            var textB = b[0].toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }).map((m, a) => {
            const kword = m[0]
            const kwtotal = m[1]

            return <Chip key={a} onClick={() => { }}
              label={<div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{kword}</span><span style={{ fontWeight: 500, color: '#9e9e9e', marginLeft: 5 }}> - {kwtotal}</span></div>}

              deleteIcon={<div>{kwtotal}</div>}
              variant="outlined"
            />
          })}
        </Stack>
      </Grid>
      {products.length > 0 && products.map((item, i) => {

        return <Grid margin={0} padding={0} item key={i} xs={6} sm={4} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>

          <ImageComponent selectedSubcategory={selectedSubcategory} plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} timestamp={item.timestamp} price={item.priceNew} />

        </Grid>
      })}


    </Grid>


  );
}



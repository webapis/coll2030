
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid'
//import IntersectionObserver from "../intersectObserver";
import ImageComponent from './imageComponent';
import  Container  from '@mui/material/Container';
import { actions } from '../store/accordionSlice'

import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SearchBox from './SearchBox';
import NavigationIcon from '@mui/icons-material/Navigation';
import Fab from '@mui/material/Fab';
export default function ProductList(props) {


  const { products, startAt, fetching, selectedMarka, selectedSubcategory, totalKeyword, navKeywords, selectedKeyword, parentKeyword, selectedKeywords, childkeywords, fetchAllComplete,selectedNavIndex } = useSelector(state => state.accordion)
  
  const dispatch = useDispatch()



  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.addEventListener('scroll', function scroll() {

      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
       //  document.getElementById("navbar").style.top = "0";

        // document.getElementById('static-nav').style.visibility = "visible"

      } else {

        //document.getElementById("navbar").style.top = "-260px";

        // document.getElementById('static-nav').style.visibility = "hidden"
      }
      prevScrollpos = currentScrollPos;

      var myButtom = document.getElementById('nav-top-btn')
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButtom.style.display = "block";
      } else {
        myButtom.style.display = "none";
      }

      if ((window.innerHeight + window.scrollY) + 2000 >= document.body.offsetHeight) {




        console.log('reached bottom of the page')
        // you're at the bottom of the page
      }




    })
  }, [])




  // useEffect(() => {
  //   if (fetchAllComplete === false) {

  //     fetchData(startAt)
  //   }

  // }, [fetchAllComplete]);


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

  useEffect(()=>{

    
      fetchData(startAt)
    
  },
  
  [])

  useEffect(()=>{
    

      fetchData(startAt)
    

  
  },[selectedNavIndex])
  // useEffect(() => {
  //   //if (selectedKeyword.length > 0) {
  //     fetchData(startAt)
  //   //}
  // }, [])

  function fetchData(start) {
    dispatch(actions.setFetchState(true))
    
    setTimeout(() => {
      
      var url = '/api/kadin/data?start=' + start + '&subcategory=' + selectedSubcategory + '&marka=' + selectedMarka + '&selectedNavIndex=' + selectedNavIndex
      //`/nav-data/${selectedSubcategory}/${selectedNavIndex}.json`
      return fetch(url, { cache: 'default' }).then(function (response) { return response.json() }).then(function (data) {
        return data
      })
        .then(function (data) {
          var collection = data.data
          
          const fetchAllComplete = [...products, ...collection].length === totalKeyword

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

  function moveToTop() {
    document.body.scrollTop = 0; document.documentElement.scrollTop = 0;
  }


  function selectKeyword({ keyword, total, kword }) {
    //  document.getElementById("navbar").style.height = "0";

    dispatch(actions.setSelectedKeyword({ keyword, parentKeyword, total, childkeywords, title: keyword }))
  }

  return (
<Container >


<Grid  container justifyContent="center" spacing={1} margin={0} padding={0}>
      <SearchBox/>
      <Grid item xs={6} sm={4} md={3} margin={0} padding={0}>
        <Stack direction="column" spacing={1} style={{ padding: 0 }}>
 

          {childkeywords.length > 1 && childkeywords.filter(f => f[0] !== parentKeyword && f[0] !== selectedKeyword).sort(function (a, b) {

            var textA = a[0].toUpperCase();
            var textB = b[0].toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }).map((m, a) => {
            const kword = m[0]
            const kwtotal = m[1]

            return <Chip key={a} onClick={() => selectKeyword({ keyword: kword, total: kwtotal })}
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


    <Fab id="nav-top-btn" variant="extended" sx={{position:'fixed',bottom:5,right:5,display:'none'}} color="primary" onClick={()=>{window.scrollTo({ top: 0 });}}>
        <NavigationIcon  />
      </Fab>
</Container>

  );
}







import React, { useEffect, useState, useRef } from 'react';

import Grid from '@mui/material/Grid'
export default function ProductImageList() {
  const [state, setData] = useState([]);



  useEffect(() => {

  fetchData(0)

  }, []);



  async function fetchData(page) {
    const gender = localStorage.getItem('gender')
    // const subcategory = localStorage.getItem('subcategory')
    // const category = localStorage.getItem('category')
  //  const url = `/.netlify/functions/atlas?gender=${gender}&category=alt-giyim&subcategory=pantolon&page=${page}`
    const url = `/api/kadin/undefined?page=${page}`
    const response = await fetch(url, { cache: 'default' })

    const { data } = await response.json()
    
    setData(prevState=>[...prevState,...data])


  }

  function fetchNextPage(){

    let prevPage = parseInt(localStorage.getItem('page'))
    let nextPage = ++prevPage
    localStorage.setItem('page', nextPage)
    fetchData(nextPage)
  }

  return (

    <Grid container justifyContent="center" spacing={1}
    >
      {state.map((item, i) => {

        return <Grid item key={i} >
          <ImageComponent plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} />
      
        </Grid>
      })}
          <button onClick={fetchNextPage}>Load More</button>
    </Grid>


  );
}


function ImageComponent(props) {
  const imageEl = useRef(null);
const cloudinary ='https://res.cloudinary.com/codergihub/image/fetch/w_250/'

  useEffect(() => {

    if (window.IntersectionObserver) {

      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            //  console.log(entry);
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      window.obz = observer
      window.obz.observe(imageEl.current)

    }


  }, []);
  return (
    <img ref={imageEl}
      src={props.plcHolder}
      data-src={cloudinary+props.imageUrl}
      alt={props.title}
      loading="lazy"
      width="250"
    />
  )

}

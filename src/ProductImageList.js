



import React, { useEffect, useState, useRef } from 'react';
import placeholders from './placeholders'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

export default function ProductImageList() {
  const [state, setData] = useState([]);



  useEffect(() => {
    localStorage.setItem('page', 0)
    fetchData(0)

  }, []);



  async function fetchData(page) {

    const subcategory = localStorage.getItem('subcategory')

    const url = `/api/kadin/data?page=${page}&subcategory=${subcategory}`
    const response = await fetch(url, { cache: 'default' })

    const { data } = await response.json()

  
    setData(prevState => [...prevState, ...data])


  }

  function fetchNextPage() {

    let prevPage = parseInt(localStorage.getItem('page'))
    let nextPage = prevPage + 100
    localStorage.setItem('page', nextPage)
    fetchData(nextPage)
  }

  return (

    <Grid container justifyContent="center" spacing={1}
    >
      {state.map((item, i) => {

        return <Grid item key={i} >
          <ImageComponent plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} />

        </Grid>
      })}
      <button onClick={fetchNextPage}>Load More</button>
    </Grid>


  );
}


function ImageComponent(props) {
  const imageEl = useRef(null);
  const cloudinary = 'https://res.cloudinary.com/codergihub/image/fetch/w_250/'
  const imagePlaceholder = placeholders[props.marka].placeholder
  const logo= placeholders[props.marka].logo
  const imageSource = cloudinary + placeholders[props.marka].imageHost.trim() + props.imageUrl
  const detailHost =placeholders[props.marka].detailHost +props.link

  useEffect(() => {

    if (window.IntersectionObserver) {

      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
     
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
    <div>
      <a href={detailHost} target="_blank">
        <img ref={imageEl}
          src={imagePlaceholder}
          data-src={imageSource}
          alt={props.title}
          loading="lazy"
          width="250"
        />
        
      </a>
      <div >
      <img src={logo}  width='80' />
      </div>
      <Typography sx={{width:250}} variant="caption" display="block" gutterBottom>
      {props.title}
      </Typography>
     
    </div>

  )

}

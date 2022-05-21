



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

        return <Grid item key={i} xs={6}>
          <ImageComponent plcHolder={item.plcHolder} imageUrl={item.imageUrl} title={item.title} marka={item.marka} link={item.link} timestamp={item.timestamp} price={item.priceNew}/>

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
  const date2 = props.timestamp
  const date1 = Date.now()
  const hour = Math.floor(Math.abs(date1 - date2) / 36e5);
  const minutesdiff = Math.abs(new Date(date1) - new Date(date2));
  var minutes = Math.floor((minutesdiff / 1000) / 60);
  var days = Math.floor(minutesdiff / (1000 * 60 * 60 * 24));
  var month = Math.round(minutesdiff / (2e3 * 3600 * 365.25));
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
    <div style={{width:145}}>
      <div style={{position:'relative'}}>
        <Typography style={{textAlign:'right', position:'absolute',bottom:-20,right:2, fontSize:10}}>{props.price} <span style={{fontSize:11}}>TL</span></Typography>
      <a href={detailHost} target="_blank">
        <img ref={imageEl}
          width="145"
          src={imagePlaceholder}
          data-src={imageSource}
          alt={props.title}
          loading="lazy"
        />
      </a>
      </div>
    
      <div>
    
      <img src={logo}  width='70' />
      
      </div>
  
      <Typography  variant="caption" display="block" gutterBottom>
      {props.title}
      </Typography>
      <Typography style={{textAlign:'right'}} variant="caption" display="block" gutterBottom>{minutes <= 59 ? minutes + ' dakika önce' : hour <= 24 ? hour + ' saat önce' : days <= 31 ? days + 'gün önce' : month + 'ay önce'}</Typography>
    </div>

  )

}

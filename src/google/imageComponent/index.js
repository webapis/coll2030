
import React, { useEffect, useRef } from 'react';
import placeholders from './placeholders'
import Typography from '@mui/material/Typography';

import Highlighter from "react-highlight-words";
import { ImageListItem } from '@mui/material';
import './hl.css'

export default function ImageComponent(props) {

     const {selectedSubcategory}=props
     const splitterwords =selectedSubcategory.split(' ')
     const productTitle =props.title//.substring(props.title.indexOf(" "),props.title.lastIndexOf(" "))

    const imageEl = useRef(null);

   // const cloudinary = 'https://res.cloudinary.com/codergihub/image/fetch/w_300/'
   
    const imagePlaceholder = placeholders[props.marka].placeholder
    
    const logo = placeholders[props.marka].logo
    
    const imageSource = placeholders[props.marka].imagePrefix.trim() + placeholders[props.marka].imageHost.trim() + props.imageUrl+placeholders[props.marka].imgPostFix
    const detailHost = placeholders[props.marka].detailHost + props.link+placeholders[props.marka].postfix
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
  
  // function  addDefaultSrc(ev){
  //     ev.target.src =placeholders[props.marka].imageHost.trim() + props.imageUrl
  //   }
  
    return (
      <div>
        <div style={{ position: 'relative', margin: 'auto' }}>
          <Typography variant="h6" style={{ textAlign: 'right', position: 'absolute', bottom: -20, right: 2 }}>{props.price} <span style={{ fontSize: 10 }}>TL</span></Typography>
          <a href={detailHost} target="_blank" >
            <ImageListItem>

         
            <img   ref={imageEl} data-intersection="true" className="figure"
         
              src={imagePlaceholder}
              data-src={imageSource.trim()}
              alt={props.title}
              loading="lazy"
            />
               </ImageListItem>
          </a>
        </div>
  
        <div>
  
          <img src={logo.image}  height={logo.heigth} width={logo.width}/>
  
        </div>
  
        <Typography variant="caption" display="block" gutterBottom>
     
        <Highlighter
    
    highlightClassName="regexColor"
    searchWords={splitterwords}
    autoEscape={true}
    textToHighlight={productTitle}
  />
        </Typography>
        <Typography color='#9e9e9e' style={{ textAlign: 'right',fontSize:9 }} variant="caption" display="block" gutterBottom>{minutes <= 59 ? minutes + ' dakika önce' : hour <= 24 ? hour + ' saat önce' : days <= 31 ? days + 'gün önce' : month + 'ay önce'}</Typography>
      </div>
  
    )
  
  }



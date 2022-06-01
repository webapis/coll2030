
import React, { useEffect, useRef } from 'react';
import placeholders from './placeholders'
import Typography from '@mui/material/Typography';
import ShowMoreText from "react-show-more-text";

export default function ImageComponent(props) {
    const imageEl = useRef(null);
    const cloudinary = 'https://res.cloudinary.com/codergihub/image/fetch/w_250/'
    const imagePlaceholder = placeholders[props.marka].placeholder
    const logo = placeholders[props.marka].logo
    const imageSource = cloudinary + placeholders[props.marka].imageHost.trim() + props.imageUrl
    const detailHost = placeholders[props.marka].detailHost + props.link
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
  
    function executeOnClick(isExpanded) {
      console.log(isExpanded);
    }
  
    return (
      <div style={{ width: 130 }}>
        <div style={{ position: 'relative', margin: 'auto' }}>
          <Typography style={{ textAlign: 'right', position: 'absolute', bottom: -20, right: 2, fontSize: 10 }}>{props.price} <span style={{ fontSize: 11 }}>TL</span></Typography>
          <a href={detailHost} target="_blank" >
            <img ref={imageEl} data-intersection="true" className="figure"
              width="130"
              src={imagePlaceholder}
              data-src={imageSource}
              alt={props.title}
              loading="lazy"
            />
          </a>
        </div>
  
        <div>
  
          <img src={logo} width='45%' />
  
        </div>
  
        <Typography variant="caption" display="block" gutterBottom>
          <ShowMoreText lines={1}
            more={<span style={{ textDecoration: 'none', fontSize: 10, marginLeft: 5 }}>fazla göster</span>}
            less={<span style={{ textDecoration: 'none', marginLeft: 5 }}>gizle</span>}
  
  
            onClick={executeOnClick}
            expanded={false}
            width={400}
            truncatedEndingComponent={"..."}>
            {props.title}
          </ShowMoreText>
  
        </Typography>
        <Typography color='#9e9e9e' style={{ textAlign: 'right',fontSize:9 }} variant="caption" display="block" gutterBottom>{minutes <= 59 ? minutes + ' dakika önce' : hour <= 24 ? hour + ' saat önce' : days <= 31 ? days + 'gün önce' : month + 'ay önce'}</Typography>
      </div>
  
    )
  
  }
  
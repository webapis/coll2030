
import React, { useEffect, useRef } from 'react';
import placeholders from './placeholders.json'
import { AppContext } from '../../App';
import Link from '@mui/material/Link';

import './hl.css'
import { Typography } from '@mui/material';


export default function ImageComponent(props) {


  const imageEl = useRef(null);

  // const cloudinary = 'https://res.cloudinary.com/codergihub/image/fetch/w_300/'
  if (props.marka === undefined) {

  }
  if (placeholders[props.marka].placeholder === undefined) {

  }
  const imagePlaceholder = placeholders[props.marka].placeholder
  if (imagePlaceholder === undefined) {

  }
  // const logo = placeholders[props.marka].logo

  const imageSource = placeholders[props.marka].imagePrefix.trim() + placeholders[props.marka].imageHost.trim() + props.imageUrl + placeholders[props.marka].imgPostFix
  const detailHost = placeholders[props.marka].detailHost + props.link + placeholders[props.marka].postfix
  // const date2 = props.timestamp
  // const date1 = Date.now()
  // const hour = Math.floor(Math.abs(date1 - date2) / 36e5);
  // const minutesdiff = Math.abs(new Date(date1) - new Date(date2));
  // var minutes = Math.floor((minutesdiff / 1000) / 60);
  // var days = Math.floor(minutesdiff / (1000 * 60 * 60 * 24));
  // var month = Math.round(minutesdiff / (2e3 * 3600 * 365.25));
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
    <AppContext.Consumer>{(({ selectedKeywords, parentKeyword, search }) => {


      const { selectedSubcategory } = props


      const productTitle = props.title.split(' ').map(t => t.trim()).map((m, i) => {
        const searchWorkds = search.length > 0 ? search.split(' ').map(m => m.toLowerCase()) : false

        const searchMatch = searchWorkds ? searchWorkds.find(f => f.includes(m.toLowerCase())) : false

        const selectedKeywordMatch = selectedKeywords.find(f => f.keyword.includes(m.toLowerCase())) || selectedKeywords.map(t => { return { ...t, keyword: t.keyword.trim() } }).find(s => m.toLowerCase().includes(s))
        const selectedSubcategoryMatch = selectedSubcategory.includes(m.toLowerCase()) || m.toLowerCase().includes(selectedSubcategory)


        return <span key={i} style={{  textTransform: 'capitalize', fontWeight: (selectedKeywordMatch || selectedSubcategoryMatch || searchMatch) ? 800 : 300 }}>{m.replace(props.marka, '')}{` `}


        </span>
      })
      return <Link underline="hover"  href={detailHost} target="_blank" rel="noreferrer">

        <img ref={imageEl} data-intersection="true" className="figure"
          width='100%'
          src={imagePlaceholder}
          data-src={imageSource.trim()}
          alt={props.title}
          loading="lazy"
        />


        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div > 
            <span style={{ display: 'flex', justifyContent: 'space-between', margin: 0, padding: 0, fontSize: 10,color:'#424242'}}><span>{props.marka.toUpperCase()}</span> <span>{props.price} TL</span></span></div>
          <Typography  variant="caption" display="block"  >{productTitle}
          </Typography>
        </div>

      </Link>

    })}

    </AppContext.Consumer >

  )

}



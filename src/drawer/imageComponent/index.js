
import React, { useEffect, useRef } from 'react';
import placeholders from './placeholders'
import Typography from '@mui/material/Typography';
import { AppContext } from '../../App';
import { ImageListItem } from '@mui/material';
import './hl.css'


export default function ImageComponent(props) {


  const imageEl = useRef(null);

  // const cloudinary = 'https://res.cloudinary.com/codergihub/image/fetch/w_300/'

  const imagePlaceholder =  placeholders[props.marka].placeholder 

  const logo = placeholders[props.marka].logo

  const imageSource = placeholders[props.marka].imagePrefix.trim() + placeholders[props.marka].imageHost.trim() + props.imageUrl + placeholders[props.marka].imgPostFix
  const detailHost = placeholders[props.marka].detailHost + props.link + placeholders[props.marka].postfix
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
    <AppContext.Consumer>{(({ selectedKeywords, parentKeyword }) => {


      const { selectedSubcategory } = props


      const productTitle = props.title.split(' ').map(t => t.trim()).map((m, i) => {

        const selectedKeywordMatch = selectedKeywords.find(f => f.keyword.includes(m.toLowerCase())) || selectedKeywords.map(t => { return { ...t, keyword: t.keyword.trim() } }).find(s => m.toLowerCase().includes(s))
        const selectedSubcategoryMatch = selectedSubcategory.includes(m.toLowerCase()) || m.toLowerCase().includes(selectedSubcategory)


        return <span key={i} style={{ fontWeight: (selectedKeywordMatch || selectedSubcategoryMatch) ? 800 : 300 }}>{m.replace(props.marka,'')}{` `}


        </span>
      })
      return <div>
        <div style={{ position: 'relative', margin: 'auto' }}>

          <a href={detailHost} target="_blank" rel="noreferrer">
            <ImageListItem>


              <img ref={imageEl} data-intersection="true" className="figure"

                src={imagePlaceholder}
                data-src={imageSource.trim()}
                alt={props.title}
                loading="lazy"
              />
            </ImageListItem>
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', }}>

        <div>{props.marka.toUpperCase()}</div>
  

          <div>
            <Typography variant="caption" style={{ textAlign: 'right', right: 2, flex: 5 }}>{props.price}TL</Typography>
          </div>

        </div>

        <Typography variant="caption" display="block" gutterBottom>

          {productTitle}
        </Typography>

        <Typography color='#9e9e9e' style={{ textAlign: 'right', fontSize: 9 }} variant="caption" display="block" gutterBottom>{minutes <= 59 ? minutes + ' dakika önce' : hour <= 24 ? hour + ' saat önce' : days <= 31 ? days + 'gün önce' : month + 'ay önce'}</Typography>

      </div>
    })}

    </AppContext.Consumer>

  )

}



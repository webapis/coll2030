import React, { useEffect, useRef } from 'react';
import Chip from '@mui/material/Chip';
import { Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';

import placeholders from './imageComponent/placeholders.json';
import Divider from '@mui/material/Divider';

export default function ProdImageIndex({ productImgIndexes, setSelectedNavIndex, navKeywords, selectedNavIndex,indexTabName,subcatTitle }) {
    
debugger

    return  <div container > {navKeywords.sort(function (a, b) {
            const akeywords = a['keywords']
            const bkeywords = b['keywords']

            return bkeywords.length - akeywords.length;
        }).filter(g=>{



            return g.groupName===indexTabName
        }).map((m,a) => {
            const { groupName, keywords } = m
debugger
            return <div key={a}>
            
                    <Grid container gap={1} style={{ display:'flex',justifyContent:'center'}} sx={{marginTop:{xs:20,sm:20,md:2}}}>

                        <Grid item xs={12} sx={{ marginBottom: 2 }}>   <Divider id={groupName}> <Chip  size="small" label={groupName} /></Divider> </Grid>

                        {keywords.map((m,i) => {
                            debugger
                            const { keywordTitle, imageUrl: { title, src: imageSrc, marka } } = productImgIndexes[m[1]]
                            const total = m[0]
                            const index = m[1]
                
                            const imageSource =placeholders[marka].imagePrefix.trim() + placeholders[marka].imageHost.trim() + imageSrc + placeholders[marka].imgPostFix
                    
                            const groupNameTitle =keywordTitle.toLowerCase()===groupName.toLowerCase()?  (keywordTitle+' '+subcatTitle).toLowerCase():(keywordTitle+' '+groupName+' '+subcatTitle).toLowerCase()
                       
                            return <Grid key={i} xs={5} sm={2} md={2}  item><Badge max={5555555} sx={{position:'relative'}}  badgeContent={<span style={{backgroundColor:'#9e9e9e',opacity:0.4,position:'absolute',left:14,top:14, padding:1,minWidth:25,minHeight:15,textAlign:'center',lineHeight:2,borderRadius:25,color:'white'}}>{total}</span>} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}><ImageIndexComp title={title} selectedNavIndex={selectedNavIndex} setSelectedNavIndex={setSelectedNavIndex} dataSrc={imageSource} index={index} keyword={groupNameTitle}  /></Badge><Tooltip title={title} placement="top"><Typography variant="caption" display="block" gutterBottom></Typography></Tooltip></Grid>
                        })}

                    </Grid>
                
            </div>
        })
        }</div>



}



function ImageIndexComp({ dataSrc, setSelectedNavIndex, index, keyword, selectedNavIndex ,title,total}) {
    const imageElement = useRef(null);
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
            window.obze = observer
            window.obze.observe(imageElement.current)
        }


    }, []);

    const matchfound = selectedNavIndex.split('-').find(f => f === index.replace('-', '')) ? true : false

    const render = <Link     onClick={() => setSelectedNavIndex({ index, keyword })} underline="hover"  href="#" style={{width:'100%'}}>
        <img style={{ borderRadius: 15 }} width='100%' ref={imageElement} data-intersection="true" className="figure" alt={keyword}
           // onClick={() => setSelectedNavIndex({ index, keyword })}
            src={window.dataURL}
            data-src={dataSrc}
            loading="lazy"
        />
        <Tooltip title={title} placement="top"><Typography variant="caption" display="block" gutterBottom   style={{textTransform:'capitalize'}} >{keyword}  <span>{total}</span></Typography></Tooltip>
      
        </Link>

    const render2 = <Link     onClick={() => setSelectedNavIndex({ index, keyword })} underline="hover" href="#" style={{ position: 'relative' }}>
        <img style={{ borderRadius: 15 }} width='100%' ref={imageElement} data-intersection="true" className="figure" alt={keyword}
           // onClick={() => setSelectedNavIndex({ index, keyword })} 
            src={window.dataURL}
            data-src={dataSrc}
            loading="lazy"
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Tooltip title={title} placement="top"><Typography variant="caption" display="block" gutterBottom  style={{textTransform:'capitalize'}} >
        <Chip  color='success' size="small" label={keyword} onDelete={matchfound ? () => (setSelectedNavIndex({ index, keyword })) : null} onClick={() => setSelectedNavIndex({ index, keyword })}></Chip>
        <span>{total}</span></Typography></Tooltip>
                    
          
        </div>
    </Link>

    if (matchfound) {
        return render2
    }
    return render
}






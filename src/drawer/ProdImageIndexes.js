import React, { useEffect, useRef } from 'react';
import Chip from '@mui/material/Chip';
import { Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

import placeholders from './imageComponent/placeholders';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import { AppContext } from '../App'

export default function ProdImageIndex({ productImgIndexes, setSelectedNavIndex, navKeywords, selectedNavIndex }) {
    debugger

    debugger
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    let imageWidth = 0

    switch (true) {
        case xs === true:
            imageWidth = 80
            break;
        case sm === true:
            imageWidth = 80
            break;
        case md === true:
            imageWidth = 100
            break;
        case lg === true:
            imageWidth = 100
            break;
        default:
            imageWidth = 100
            break;
    }





    return <div sx={{ paddingRight: 0 }} center>
      
        <Grid container> {navKeywords.filter(f => {
            return f.groupName !== 'Fiyat' && f.groupName !== 'Marka'
        }).sort(function (a, b) {

            const akeywords = a['keywords']
            const bkeywords = b['keywords']

            return bkeywords.length - akeywords.length;
        }).map(m => {
            const { groupName, keywords } = m
            let colTop = 0
            let colBottom = 0
            switch (true) {
                case keywords.length > 3:
                    colTop = 12
                    colBottom = 2
                    break;
                case keywords.length === 3:
                    colTop = 6
                    colBottom = 4
                    break;

                case keywords.length === 2:
                    colTop = 4
                    colBottom = 6
                    break;

                case keywords.length === 1:
                    colTop = 2
                    colBottom = 1
                    break;

                default:
            }

            return <Grid item xs={colTop}>
                <Paper sx={{ margin: 1, padding: 1 }}>
                    <Grid container>

                        <Grid item xs={12} sx={{ marginBottom: 2 }}>   <Divider>{groupName}</Divider> </Grid>

                        {keywords.map(m => {
                            const { keywordTitle, imageUrl: { title, src: imageSrc, marka } } = productImgIndexes[m[1]]
                            const total = m[0]
                            const index = m[1]
                            const imageSource = placeholders[marka].imagePrefix.trim() + placeholders[marka].imageHost.trim() + imageSrc + placeholders[marka].imgPostFix
                            return <Grid xs={4} sm={colBottom} item sx={{ display: 'flex', flexDirection: 'column' }}><Badge max={999} color='info' badgeContent={total} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}><ImageIndexComp title={title} selectedNavIndex={selectedNavIndex} setSelectedNavIndex={setSelectedNavIndex} dataSrc={imageSource} index={index} keyword={keywordTitle} imageWidth={imageWidth} /></Badge><Tooltip title={title} placement="top"><Typography variant="caption" display="block" gutterBottom></Typography></Tooltip></Grid>
                        })}

                    </Grid>
                </Paper>
            </Grid>
        })
        }</Grid>
    </div>



}



function ImageIndexComp({ dataSrc, setSelectedNavIndex, index, keyword, imageWidth, selectedNavIndex ,title}) {
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

    const render = <div>
        <img style={{ borderRadius: 25, width: imageWidth }} ref={imageElement} data-intersection="true" className="figure" alt={keyword}
            onClick={() => setSelectedNavIndex({ index, keyword })} width="100"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACiCAMAAAD1LOYpAAAAMFBMVEXMzMynp6efn5/Pz8+kpKTFxcW3t7fBwcG+vr7JycmxsbGcnJy7u7usrKy0tLTS0tL6gnAAAAABsElEQVR4nO3Y0W6DIBSAYTkHRETw/d92h9a167KNLNkCF/93sU5N2j8KaLssAAAAAAAAAAAAAAAAAAAA+GOaQkfSwYmr73F1aKCuWbry0EZ1UmLHLm7kpbbE9fzumGkvRx6cmNevP1/TdmxtpthYmDNRo7dR6KJOm6hbFu+sMkybmJy4kOxMFp01MYq0a7xJtrM4ekZ/l+iTvaQ8W+J9lWmCl+NczipZl4kSdSuupmtjF9k3+1N1prNY283OhftmcjlnyWWmdVGLSGmV8WqsXvy6TJSYrHDX08agXA8Nel43wDkS9ZEWXLbU2yFNyxyJYolqy6Bs1wW3OeLapDmsep8i0c6iHiI+PjJW2wpt8tijZAlT3F3Oe9NTK3aSfajtwDk8Uer7lX3ubCOzDU27AYocw9dF8ZL39LqzDcPj9l901j88Ua4Z/Ny3P1dwXUpbz0cnHp8Ka5by4YvpOj6xfv78KC8XXuvoxC8exvRlzwyLTufzSexzNvB+/FUnpcFf9Zc9i+uwdXNk4e0hrKek/vv8q7h1xMGB959ufja6EAAAAAAAAAAAAAAAAAAA4LfeAEgFD6AjkYDWAAAAAElFTkSuQmCC"
            data-src={dataSrc}
            loading="lazy"
        />
        <Tooltip title={title} placement="top"><Typography variant="caption" display="block" gutterBottom>{keyword}</Typography></Tooltip>
  
        </div>

    const render2 = <div style={{ position: 'relative' }}>
        <img style={{ borderRadius: 25, width: imageWidth }} ref={imageElement} data-intersection="true" className="figure" alt={keyword}
            onClick={() => setSelectedNavIndex({ index, keyword })} width="100"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACiCAMAAAD1LOYpAAAAMFBMVEXMzMynp6efn5/Pz8+kpKTFxcW3t7fBwcG+vr7JycmxsbGcnJy7u7usrKy0tLTS0tL6gnAAAAABsElEQVR4nO3Y0W6DIBSAYTkHRETw/d92h9a167KNLNkCF/93sU5N2j8KaLssAAAAAAAAAAAAAAAAAAAA+GOaQkfSwYmr73F1aKCuWbry0EZ1UmLHLm7kpbbE9fzumGkvRx6cmNevP1/TdmxtpthYmDNRo7dR6KJOm6hbFu+sMkybmJy4kOxMFp01MYq0a7xJtrM4ekZ/l+iTvaQ8W+J9lWmCl+NczipZl4kSdSuupmtjF9k3+1N1prNY283OhftmcjlnyWWmdVGLSGmV8WqsXvy6TJSYrHDX08agXA8Nel43wDkS9ZEWXLbU2yFNyxyJYolqy6Bs1wW3OeLapDmsep8i0c6iHiI+PjJW2wpt8tijZAlT3F3Oe9NTK3aSfajtwDk8Uer7lX3ubCOzDU27AYocw9dF8ZL39LqzDcPj9l901j88Ua4Z/Ny3P1dwXUpbz0cnHp8Ka5by4YvpOj6xfv78KC8XXuvoxC8exvRlzwyLTufzSexzNvB+/FUnpcFf9Zc9i+uwdXNk4e0hrKek/vv8q7h1xMGB959ufja6EAAAAAAAAAAAAAAAAAAA4LfeAEgFD6AjkYDWAAAAAElFTkSuQmCC"
            data-src={dataSrc}
            loading="lazy"
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Tooltip title={title} placement="top"><Typography variant="caption" display="block" gutterBottom>
        <Chip color='success' size="small" label={keyword} onDelete={matchfound ? () => (setSelectedNavIndex({ index, keyword })) : null} onClick={() => setSelectedNavIndex({ index, keyword })}></Chip>
            </Typography></Tooltip>
                    
            
        </div>
    </div>

    if (matchfound) {
        return render2
    }
    return render
}






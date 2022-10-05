import React, { useEffect, useRef } from 'react';

import { Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';

export default function ProdImageIndex({ productImgIndexes, setSelectedNavIndex }) {

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
    const imgIndex = Object.entries(productImgIndexes)


    debugger

    return <Container sx={{ paddingRight: 0 }} center>

        {imgIndex.map(m => {
            debugger
            const groupItems = m[1]

            const groupName = m[0]
            return <Grid container >
                <Grid item xs={12} sx={{ backgroundColor: '#cfd8dc', marginTop: 5, marginBottom: 2 }}><Typography variant="button" display="block">{groupName}</Typography> </Grid>
                {groupItems.map(m => {
                    const { index, keyword, title, productName, total, imageSrc } = m
                    const src = `/indexed-images/${productName}/${imageSrc}`
                    return <Grid xs={4} sm={2} item sx={{ display: 'flex', flexDirection: 'column' }}><Badge max={999} color='info' badgeContent={total} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}><ImageIndexComp  setSelectedNavIndex={setSelectedNavIndex} dataSrc={src} index={index} keywor={keyword} imageWidth={imageWidth} /></Badge><Tooltip title={title} placement="top"><Typography variant="caption" display="block" gutterBottom>{keyword} {productName}</Typography></Tooltip></Grid>
                })}</Grid>



        })
        }
    </Container>



}



function ImageIndexComp({ dataSrc, setSelectedNavIndex, index, keyword ,imageWidth}) {
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

    return <img style={{ borderRadius: 25, width: imageWidth }} ref={imageElement} data-intersection="true" className="figure" alt={keyword}
        onClick={() => setSelectedNavIndex({ index, keyword })} width="100"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAACiCAMAAAD1LOYpAAAAMFBMVEXMzMynp6efn5/Pz8+kpKTFxcW3t7fBwcG+vr7JycmxsbGcnJy7u7usrKy0tLTS0tL6gnAAAAABsElEQVR4nO3Y0W6DIBSAYTkHRETw/d92h9a167KNLNkCF/93sU5N2j8KaLssAAAAAAAAAAAAAAAAAAAA+GOaQkfSwYmr73F1aKCuWbry0EZ1UmLHLm7kpbbE9fzumGkvRx6cmNevP1/TdmxtpthYmDNRo7dR6KJOm6hbFu+sMkybmJy4kOxMFp01MYq0a7xJtrM4ekZ/l+iTvaQ8W+J9lWmCl+NczipZl4kSdSuupmtjF9k3+1N1prNY283OhftmcjlnyWWmdVGLSGmV8WqsXvy6TJSYrHDX08agXA8Nel43wDkS9ZEWXLbU2yFNyxyJYolqy6Bs1wW3OeLapDmsep8i0c6iHiI+PjJW2wpt8tijZAlT3F3Oe9NTK3aSfajtwDk8Uer7lX3ubCOzDU27AYocw9dF8ZL39LqzDcPj9l901j88Ua4Z/Ny3P1dwXUpbz0cnHp8Ka5by4YvpOj6xfv78KC8XXuvoxC8exvRlzwyLTufzSexzNvB+/FUnpcFf9Zc9i+uwdXNk4e0hrKek/vv8q7h1xMGB959ufja6EAAAAAAAAAAAAAAAAAAA4LfeAEgFD6AjkYDWAAAAAElFTkSuQmCC"
        data-src={dataSrc}

        loading="lazy"
    />
}
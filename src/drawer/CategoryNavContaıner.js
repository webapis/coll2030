import * as React from 'react';


import { Container, Typography } from '@mui/material';
import SubcategoryCard from './SubcategoryCard';
import { useTheme } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CategoryNavContainer({ subcategories, products, fetchingProduct, selectSubcategory }) {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    function render(size) {

        return products.length === 0 && !fetchingProduct && <Container sx={{ marginTop: 10 }}>
            <Typography align="center" variant="h5">Ürün Kategorileri</Typography>
            <ImageList cols={size} gap={8}
                variant="masonry"
            >
                {subcategories.map((item, i) => {
                    const indexes = item[1]
                    return <div > <SubcategoryCard selectSubcategory={selectSubcategory} indexes={indexes} /></div>
                })}
            </ImageList >
        </Container>
    }

    switch (true) {
        case xs === true:
            return render(1)
        case sm === true:
            return render(1)
        case md === true:
            return render(3)
        case lg === true:
            return render(6)
        default:
            return render(6)
    }


}
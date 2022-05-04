import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FilterListIcon from '@mui/icons-material/FilterList';
import Container from '@mui/material/Container';
export default function FilterResult() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Tabs value={value} onChange={handleChange}    variant="scrollable"  scrollButtons="auto" allowScrollButtonsMobile  sx={{paddingBottom:'10px'}}>
                <Tab label={<div>Sonuç<span></span><br/><span style={{color:'#9e9e9e'}}>(12.000)</span></div>} sx={{fontSize:'12px'}}/>
                <Tab label={<div><span>Kategory</span><br/><span style={{color:'#9e9e9e'}}>(2)</span></div>} sx={{fontSize:'12px'}} />
                <Tab label={<div><span>Fiyat</span><br/><span style={{color:'#9e9e9e'}}>(1)</span></div>}   sx={{fontSize:'12px'}}/>
                <Tab label={<div><span>Marka</span><br/><span style={{color:'#9e9e9e'}}>(10)</span></div>}   sx={{fontSize:'12px'}}/>
                <Tab  icon={<FilterListIcon/>} sx={{fontSize:'12px'}}/>
            </Tabs>
        </Container>
    );
}
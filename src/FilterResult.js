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
            <Tabs value={value} onChange={handleChange} centered variant="scrollable" scrollButtons="auto" sx={{paddingBottom:'10px'}}>
                <Tab label="0000000" />
                <Tab label="Kategory" />
                <Tab label="Fiyat" />
                <Tab label="Marka" />
                <Tab  icon={<FilterListIcon/>}/>
            </Tabs>
        </Container>
    );
}
import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SearchBox from './SearchBox';
import Container from '@mui/material/Container';
import FilterResult from './FilterResult';

export default function CenteredTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
    
            <Tabs value={value} onChange={handleChange} centered variant="scrollable" scrollButtons="auto" sx={{paddingBottom:'10px'}}>
                <Tab label="ERKEK" />
                <Tab label="KADIN" />
                <Tab label="ERKEK ÇOCUK" />
                <Tab label="KIZ ÇOCUK" />
                <Tab label="ERKEK BEBEK" />
                <Tab label="KIZ BEBEK" />
            </Tabs>
            <SearchBox />
            <FilterResult/>
        </Container>


    );
}
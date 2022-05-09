import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SearchBox from './SearchBox';

import CategoryTab from './CategoryTabs'

import Box from '@mui/material/Box'
export default function CenteredTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box >
    
            <Tabs centered value={value} onChange={handleChange}    allowScrollButtonsMobile >
                <Tab label="KADIN" />
                <Tab label="ERKEK" />
                <Tab label="KIZ ÇOCUK" />
                <Tab label="ERKEK ÇOCUK" />
                <Tab label="KIZ BEBEK" />
                <Tab label="ERKEK BEBEK" />
               
            </Tabs>
            <CategoryTab/>
            <SearchBox />
      
        </Box>


    );
}
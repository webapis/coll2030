import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export default function CategoryTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
 
            <Tabs centered value={value} onChange={handleChange}      scrollButtons="auto" allowScrollButtonsMobile >
                 <Tab label="Tümü" />
                <Tab label="Giyim" />
                <Tab label="Ayakkabı"  />
                <Tab label="Aksessuar"   />
              
            </Tabs>
     

 
    );
}


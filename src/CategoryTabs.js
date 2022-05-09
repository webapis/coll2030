import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export default function CategoryTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
 
            <Tabs centered value={value} onChange={handleChange}      scrollButtons="auto" allowScrollButtonsMobile sx={{marginTop:0,paddingTop:0}}>
                 <Tab label="Tümü" sx={{fontSize:'12px'}}/>
                <Tab label="Giyim" sx={{fontSize:'12px'}}/>
                <Tab label="Ayakkabı" sx={{fontSize:'12px'}} />
                <Tab label="Aksessuar"   sx={{fontSize:'12px'}}/>
              
            </Tabs>
     

 
    );
}


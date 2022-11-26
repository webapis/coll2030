import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import { AppContext } from "../App";
export default function HorizontalKeywords() {

    return <AppContext.Consumer>{({ navKeywords,setIndexTab,indexTab }) => {
        return (
            <Box style={{width:'70%'}}  >
              
                    {navKeywords && navKeywords.length>0 &&                 <Tabs
              
                    value={indexTab}
                    onChange={setIndexTab}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                    centered
                >

                    <Tab  label="Tümü"  style={{textTransform:'capitalize'}} />
                        {navKeywords && navKeywords.length>0 && navKeywords.map((m, i) => {

                            const { groupName } = m


                            return <Tab style={{textTransform:'capitalize'}}  label={groupName} id={groupName} />
                        })
                        }
                  
                </Tabs> }


                <div id="ancc"></div>
           

            </Box>
        );
    }}</AppContext.Consumer>
}
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import { AppContext } from "../App";
export default function HorizontalKeywords() {

    return <AppContext.Consumer>{({ navKeywords,setIndexTab,indexTab }) => {
  
        return (
            <Box style={{width:'100%', display:'flex', justifyContent:'center'}}  >
              
                    {navKeywords && navKeywords.length>0 &&                 <Tabs
              
                    value={indexTab}
                    onChange={setIndexTab}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
               
                >

                    <Tab  label="Seçenekler" id='Seçenekler' style={{textTransform:'capitalize',fontSize:16}} />
                        {navKeywords && navKeywords.length>0 && navKeywords.filter(f=>f.groupName !=='Seçenekler').map((m, i) => {
                            const { groupName } = m
                            return <Tab key={i+'k'} style={{textTransform:'capitalize',fontSize:16}}  label={groupName} id={groupName} />
                        })
                        }
                     
                  
                </Tabs> }


                <div id="ancc"></div>
           

            </Box>
        );
    }}</AppContext.Consumer>
}
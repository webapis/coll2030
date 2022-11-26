import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { AppContext } from "../App";
export default function HorizontalKeywords() {

    return <AppContext.Consumer>{({ navKeywords,availableProducts,products }) => {
        return (
            <Box style={{width:'70%'}}  >
              
                    {navKeywords && navKeywords.length>0 &&                 <Tabs
              
                    value={0}
                       
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                    centered
                >
          


                    <Tab  label="Tümü"  style={{textTransform:'capitalize'}} />
                        {navKeywords && navKeywords.length>0 && navKeywords.map((m, i) => {

                            const { groupName } = m


                            return <Tab style={{textTransform:'capitalize'}}  label={groupName} />
                        })
                        }
                  
                </Tabs> }


                <div id="ancc"></div>
           

            </Box>
        );
    }}</AppContext.Consumer>
}
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import Chip from '@mui/material/Chip';
import { Container } from "@mui/material"
import { AppContext } from "../App"
export default function HorizontalCatNavigation() {
    return <AppContext.Consumer>{({subcategories }) => {

        return <Container>

        
         <Tabs
                centered
                value={0}
            
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                indicatorColor="white"
            >
                <div style={{ width:'100%',display:'flex', justifyContent:'center'}}>



                    {subcategories && subcategories.length>0 && subcategories.map((m, i) => {

                        const  groupName  = m[0]


                        return <Tab sx={{padding:0}} icon={<Chip sx={{ textTransform: 'capitalize',margin:0 }} label={groupName}  />} />
                    })
                    }
                </div>
            </Tabs>
            
        </Container>

    }}</AppContext.Consumer>
}
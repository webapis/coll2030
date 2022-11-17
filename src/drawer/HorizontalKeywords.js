import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { AppContext } from "../App";
export default function HorizontalKeywords() {

    return <AppContext.Consumer>{({ navKeywords,availableProducts }) => {
        return (
            <div center >
                <div style={{display:'flex', justifyContent:'center',margin:0,padding:0}}>
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



                        {navKeywords && navKeywords.map((m, i) => {

                            const { groupName } = m


                            return <Tab sx={{padding:0}} icon={<Chip sx={{ textTransform: 'capitalize' }} label={groupName} size="small" />} />
                        })
                        }
                    </div>
                </Tabs>
                <Typography sx={{ color: '#757575',alignSelf:'center',opacity:0.7 }}>{availableProducts} Ürün Sayısı</Typography>
                <div id="ancc"></div>
                </div>

            </div>
        );
    }}</AppContext.Consumer>
}
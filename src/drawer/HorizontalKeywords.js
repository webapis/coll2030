import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { AppContext } from "../App";
export default function HorizontalKeywords() {

    return <AppContext.Consumer>{({ navKeywords }) => {
        return (
            <Box sx={{ maxWidth: { xs: 320, sm: 600 }, bgcolor: 'background.paper' }}>
                <Tabs
                    value={0}

                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >


                    {navKeywords && navKeywords.map((m, i) => {

                        const { groupName, keywords } = m


                        return <Tab icon={<Chip sx={{textTransform:'capitalize'}} label={groupName} size="small" />} />
                    })
                    }
                </Tabs>
            </Box>
        );
    }}</AppContext.Consumer>
}
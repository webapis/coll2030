
import { AppContext } from "../App";

import placeholders from "./imageComponent/placeholders";
import { Typography } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
export default function CarouselContainer(props) {

    const { navKeywords } = props
    const fattened = navKeywords.map(m => m.keywords).flat().filter(f => f.count > 300)
    
    return <Tabs 
    centered
    variant="scrollable"
    scrollButtons="auto"
    sx={{height:100,width:'100%'}}

    >
        {fattened.map((m) => {
            const imageUrl = placeholders[m.marka].imageHost.trim() + m.imageUrl.trim()
            
            return <Tab icon={<img src={imageUrl} height="70"/> } label={m.keyword} style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
             
                <div>
                    <Typography>{m.keyword}</Typography>
                </div>
                </div>
        

            </Tab>
        })}


    </Tabs >



}
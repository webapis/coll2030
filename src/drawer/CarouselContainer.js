
import { AppContext } from "../App";

import placeholders from "./imageComponent/placeholders";
import { Typography } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
export default function CarouselContainer(props) {

    const { navKeywords } = props
    const fattened = navKeywords.map(m => m.keywords).flat().filter(f => f.count > 300)
    
    return <Tabs 

    variant="scrollable"
    scrollButtons="auto"


    >
        {fattened.map((m) => {
            const imageUrl = placeholders[m.marka].imageHost + m.imageUrl
            
            return <Tab icon={<img src={imageUrl} width="px" height="50px" /> } label={m.keyword} style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
             
                <div>
                    <Typography>{m.keyword}</Typography>
                </div>
                </div>
        

            </Tab>
        })}


    </Tabs >



}
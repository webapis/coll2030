
import placeholders from "./imageComponent/placeholders";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
export default function CarouselContainer(props) {

    const { navKeywords } = props
    const fattened = navKeywords.map(m => m.keywords).flat().filter(f => f.count > 300)
    
    return <Tabs 

    variant="scrollable"
    scrollButtons="auto"
    sx={{height:100,width:'100%'}}
    value={0}

    >
        {fattened.map((m,i) => {
            const imageUrl = placeholders[m.marka].imageHost.trim() + m.imageUrl.trim()
            
            return <Tab key={i} value={i} icon={<img src={imageUrl} height="70"/> } label={m.keyword} style={{ display: 'flex', flexDirection: 'column' }}/>
     
        })}


    </Tabs >



}
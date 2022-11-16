
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppContext } from '../App'

import SearchBox from './SearchBox';
export default function TabContainer() {

    return <AppContext.Consumer>

        {({ setSelectedFilterTab, selectedFiterTab }) => {
            return <div style={{display:'flex', justifyContent:'space-between'}}>
                <Tabs value={selectedFiterTab} onChange={setSelectedFilterTab}>
                <Tab label="Seçenekler" index={0} />
                <Tab label="Bulunanlar" index={1} />
               
            </Tabs> 
 
                </div>
         
       
          
        }
        }
       
    </AppContext.Consumer>

}
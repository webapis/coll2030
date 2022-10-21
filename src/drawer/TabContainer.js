
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AppContext } from '../App'
import Container from '@mui/material/Container';
export default function TabContainer() {

    return <AppContext.Consumer>

        {({ setSelectedFilterTab, selectedFiterTab }) => {
            return <Container><Tabs value={selectedFiterTab} onChange={setSelectedFilterTab}>
                <Tab label="Seçenekler" index={0} />
                <Tab label="Bulunanlar" index={1} />
            </Tabs> </Container>
        }
        }
       
    </AppContext.Consumer>

}
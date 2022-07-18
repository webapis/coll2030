
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/accordionSlice'
export default function TabsContainer(props) {
    const {selectedMainTab} = useSelector(state => state.accordion)

    const dispatch = useDispatch()

    function onChange(e) {
        const { id } = e.target
        let selectedMainTab = 0
        switch (id) {
            case 'Markalar':
                selectedMainTab=1
                break;
            case 'Ürünler':
                selectedMainTab=2
                break;
            case 'Anasayfa':
                selectedMainTab=0
                break;
        }
       
        dispatch(actions.setMainTab(selectedMainTab))
    }
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tabs value={selectedMainTab} onChange={onChange} variant="scrollable"
                scrollButtons="auto" allowScrollButtonsMobile textColor="inherit" >
                <Tab label="Anasayfa" id="Anasayfa" />
                <Tab label="Markalar" id="Markalar" />
                <Tab label="Ürünler" id="Ürünler" />
            </Tabs>
        </Container>
    )
}
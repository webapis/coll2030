
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/breadcrumbSlice'
export default function TabsContainer(props) {
  const selectedTab = useSelector(state => state.breadcrumb.selectedTab)
  const dispatch = useDispatch()

  function handleChange(e, selectedTab) {
    const { id } = e.target
    dispatch(actions.selectTab({ selectedTab, selectedTabLabel: id }))
  }
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Tabs value={selectedTab} onChange={handleChange} variant="scrollable"
        scrollButtons="auto" allowScrollButtonsMobile textColor="inherit" >
        <Tab label="Ürünler" id="Ürünler" />
        <Tab label="Markalar" id="Markalar" />
        <Tab label="Sonuç" id="Sonuç" />

      </Tabs>
    </Container>
  )
}
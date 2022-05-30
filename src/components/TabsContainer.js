
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
export default function TabsContainer(props){

    const {handleChange,value}=props

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable"
          scrollButtons="auto" allowScrollButtonsMobile textColor="inherit" >
          <Tab label="Ürünler" />
          <Tab label="Markalar" />
          <Tab label="Sonuç" />

        </Tabs>
      </Container>
    )
}
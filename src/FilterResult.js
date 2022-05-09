import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
export default function FilterResult() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Tabs centered value={value} onChange={handleChange}      scrollButtons="auto" allowScrollButtonsMobile  sx={{paddingBottom:'10px'}}>
                <Tab label={<div>Sonuç<span></span><br/><span style={{color:'#9e9e9e'}}>(12.000)</span></div>} sx={{fontSize:'12px'}}/>
                <Tab label={<div><span>Stile göre</span><br/><span style={{color:'#9e9e9e'}}>(2)</span></div>} sx={{fontSize:'12px'}} />
                <Tab label={<div><span>Fiyatlar</span><br/><span style={{color:'#9e9e9e'}}>(1)</span></div>}   sx={{fontSize:'12px'}}/>
                <Tab label={<div><span>Fırsatlar</span><br/><span style={{color:'#9e9e9e'}}>(2)</span></div>}   sx={{fontSize:'12px'}}/>
                <Tab label={<div><span>Markalar</span><br/><span style={{color:'#9e9e9e'}}>(10)</span></div>}   sx={{fontSize:'12px'}}/>
               
            </Tabs>
            <TabPanel value={value} index={0}>0</TabPanel>
            <TabPanel value={value} index={1}>1</TabPanel>
            <TabPanel value={value} index={2}>2</TabPanel>
            <TabPanel value={value} index={3}>3</TabPanel>
            <TabPanel value={value} index={4}>4</TabPanel>
     
        </Container>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
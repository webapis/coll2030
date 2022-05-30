import * as React from 'react';
import Box from '@mui/material/Box';
import ProductImageList from './ProductImageList'
import CategoryMenu from './categoryMenu';
import MarkaMenu from './markaMenu';

export default function FilterResult(props) {
  const { selectedTab, handleChange } = props
  return (
    <Box >
      <TabPanel value={selectedTab} index={0} sx={{ display: 'flex', justifyContent: 'center' }}>
        <CategoryMenu sx={{ height: "100%" }} handleTabChange={handleChange} />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <MarkaMenu sx={{ height: "100%" }} handleTabChange={handleChange} />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <ProductImageList  />
      </TabPanel>

 
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}

      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </Box>
  );
}



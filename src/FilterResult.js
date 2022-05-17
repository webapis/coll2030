import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



import Box from '@mui/material/Box';
import ProductImageList from './ProductImageList'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import nav from './nav.json'
const {navs,total}=nav

export default function FilterResult() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs centered value={value} onChange={handleChange} scrollButtons="auto" allowScrollButtonsMobile sx={{ paddingBottom: '10px' }}>
        <Tab label={<div>Ürünler<span></span><br /><span style={{ color: '#9e9e9e' }}>({total})</span></div>} sx={{ fontSize: '12px' }} />
        <Tab label={<div>Sonuç<span></span><br /><span style={{ color: '#9e9e9e' }}>(12.000)</span></div>} sx={{ fontSize: '12px' }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProductMenu  sx={{height:"100%"}}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductImageList />
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
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}


function ProductMenu() {


 function handleTreeClick(subcategory){
  localStorage.setItem('subcategory',subcategory)
  debugger;


  }

  return (<div>
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{  flexGrow: 1,  }}
    >
      {Object.entries(navs).map((n, i) => {
        debugger;
        const {category,categoryTotal,subcategories} = n[1]
     
        return (
          <TreeItem key={i} nodeId={category+ i} label={<div><span>{category}</span><span style={{color:'#9e9e9e',marginLeft:2, borderRadius:25,padding:2}}>({categoryTotal})</span></div>}>
            {Object.values(subcategories).map((s,c)=>{
       
              const {subcategory,subCatTotal}=s
              return  <TreeItem key={c} id={subcategory} onClick={()=>handleTreeClick(subcategory)} nodeId={`${subcategory}-${c}`} label={<span><span>{subcategory}</span><span style={{color:'#9e9e9e',marginLeft:2, borderRadius:25,padding:2}}>({subCatTotal})</span></span>} />
         
            })}
           
          </TreeItem>
        )

      })}
    </TreeView>


  </div>)
}

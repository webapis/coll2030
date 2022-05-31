import * as React from 'react';
import Box from '@mui/material/Box';
import ProductImageList from './ProductImageList'
import Link from '@mui/material/Link';
import MarkaMenu from './markaMenu';
import { actions } from '../store/breadcrumbSlice'
import { useDispatch, useSelector } from 'react-redux';

export default function FilterResult(props) {
  const dispatch = useDispatch()
  const selectedTab = useSelector(state => state.breadcrumb.selectedTab)


  function handleChange(event, tabId) {
    dispatch(actions.selectTab(tabId))
  }

  return (
    <Box >
      <TabPanel value={selectedTab} index={0} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Subcategories />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <MarkaMenu sx={{ height: "100%" }} handleTabChange={handleChange} />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
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
        <Box >
          {children}
        </Box>
      )}
    </Box>
  );
}


function Subcategories() {
  const dispatch =useDispatch()
  const subcategories = useSelector(state => state.breadcrumb.subcategories)
  const object =subcategories && Object.entries(subcategories)[1] && Object.entries(subcategories)[1][1]
  function handleSubCategoryClick(e) {
    const { id } = e.target
    dispatch(actions.selectSubcategory({selectedSubcategory:id}))
    debugger;
  }
  return <div style={{ display: 'flex', flexDirection: 'column' }}>

    {
      object && Object.entries(object).map((o, i) => {
        const subcategory = o[0]
        const subtotal = o[1]
        return <Link onClick={handleSubCategoryClick} id={subcategory}>{subcategory}{subtotal}</Link>

      })
    }
  </div>

}

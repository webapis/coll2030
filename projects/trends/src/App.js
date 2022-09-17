
import * as React from 'react';

import { useSelector } from 'react-redux';

import TotalCollected from './collected-reports/TotalCollected'

import SubcategoryPie from './collected-reports/SubcategoryPie';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import TabContainer from './collected-reports/TabContainer';
import Container from '@mui/material/Container'
import TotalUpdated from './collected-reports/TotalUpdated';
import TotalDeleted from './collected-reports/TotalDeleted';
import TotalNewData from './collected-reports/TotalNewData';
import ByBrandCollected from './collected-reports/ByBrandCollected';
import CollectedDataDrawer from './CollectedDataDrawer';
import ByBrandUpdated from './collected-reports/ByBrandUpdated';
import ByBrandDeleted from './collected-reports/ByBrandDeleted';
import ByBrandNewData from './collected-reports/ByBrandNewData';
import BySubcategoryCollected from './collected-reports/BySubcategoryCollected';
import BySubcategoryUpdated from './collected-reports/BySubcategoryUpdated';
import BySubcategoryDeleted from './collected-reports/BySubcategoryDeleted';
import BySubcategoryNewData from './collected-reports/BySubcategoryNewData';
export default function App() {
   const { collectedReport, selectedTab } = useSelector(state => state.main)
   return <Container sx={{ marginTop: 10, display: 'flex' }}>
      <div>
         <CollectedDataDrawer />
      </div>
      <div style={{display:'flex'}}>
         <AppBar color='' position='fixed' sx={{ top: 64, left: 155}} >
            <Toolbar>
               <TabContainer />
            </Toolbar>
         </AppBar>
<div container  style={{paddingLeft:100,marginTop:80}}>


       
         {collectedReport === 'Total' && selectedTab === 0 && <TotalCollected />}
         {collectedReport === 'Total' && selectedTab === 1 && <TotalUpdated />}
         {collectedReport === 'Total' && selectedTab === 2 && <TotalDeleted />}
         {collectedReport === 'Total' && selectedTab === 3 && <TotalNewData />}
         {collectedReport === 'By Brand' && selectedTab === 0 &&<ByBrandCollected />}
         {collectedReport === 'By Brand' && selectedTab === 1 &&<ByBrandUpdated />}
         {collectedReport === 'By Brand' && selectedTab === 2 &&<ByBrandDeleted />}
         {collectedReport === 'By Brand' && selectedTab === 3 &&<ByBrandNewData />}
         {collectedReport === 'By Category' && selectedTab === 0 && <BySubcategoryCollected />}
         {collectedReport === 'By Category' && selectedTab === 1 && <BySubcategoryUpdated />}
         {collectedReport === 'By Category' && selectedTab === 2 && <BySubcategoryDeleted />}
         {collectedReport === 'By Category' && selectedTab === 3 && <BySubcategoryNewData/>}
         {collectedReport === 'Subcategory Pie' && <SubcategoryPie />}
      </div>
      </div>

   </Container>

}

//'Total', 'By Brand', 'By Category'

import * as React from 'react';

import { useSelector } from 'react-redux';
import TotalCollected from './TotalCollected'
import SubcategoryPie from './SubcategoryPie';
import { AppBar, Toolbar } from '@mui/material';
import TabContainer from './TabContainer';
import Container from '@mui/material/Container'
import TotalUpdated from './TotalUpdated';
import TotalDeleted from './TotalDeleted';
import TotalNewData from './TotalNewData';
import ByBrandCollected from './ByBrandCollected';
import CollectedDataDrawer from './CollectedDataDrawer';
import ByBrandUpdated from './ByBrandUpdated';
import ByBrandDeleted from './ByBrandDeleted';
import ByBrandNewData from './ByBrandNewData';
import BySubcategoryCollected from './BySubcategoryCollected';
import BySubcategoryUpdated from './BySubcategoryUpdated';
import BySubcategoryDeleted from './BySubcategoryDeleted';
import BySubcategoryNewData from './BySubcategoryNewData';
export default function CollectedDataContainer() {
    const { collectedReport, selectedTab } = useSelector(state => state.collectedData)
    return <Container sx={{ marginTop: 10, display: 'flex' }}>
        <div>
            <CollectedDataDrawer />
        </div>
        <div style={{ display: 'flex' }}>
            <AppBar color='' position='fixed' sx={{ top: 64, left: 155 }} >
                <Toolbar>
                    <TabContainer />
                </Toolbar>
            </AppBar>
            <div container style={{ paddingLeft: 100, marginTop: 80 }}>
                {collectedReport === 'Total' && selectedTab === 0 && <TotalCollected />}
                {collectedReport === 'Total' && selectedTab === 1 && <TotalUpdated />}
                {collectedReport === 'Total' && selectedTab === 2 && <TotalDeleted />}
                {collectedReport === 'Total' && selectedTab === 3 && <TotalNewData />}
                {collectedReport === 'By Brand' && selectedTab === 0 && <ByBrandCollected />}
                {collectedReport === 'By Brand' && selectedTab === 1 && <ByBrandUpdated />}
                {collectedReport === 'By Brand' && selectedTab === 2 && <ByBrandDeleted />}
                {collectedReport === 'By Brand' && selectedTab === 3 && <ByBrandNewData />}
                {collectedReport === 'By Category' && selectedTab === 0 && <BySubcategoryCollected />}
                {collectedReport === 'By Category' && selectedTab === 1 && <BySubcategoryUpdated />}
                {collectedReport === 'By Category' && selectedTab === 2 && <BySubcategoryDeleted />}
                {collectedReport === 'By Category' && selectedTab === 3 && <BySubcategoryNewData />}
                {collectedReport === 'Subcategory Pie' && <SubcategoryPie />}
            </div>
        </div>
    </Container>
}
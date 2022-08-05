
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import KeywordsList from './KeywordsList';
import Drawer from '@mui/material/Drawer';
import { AppContext } from '../App';
export default function KeywordListDrawer() {


    return <AppContext.Consumer>{({ toggleFilterDrawer, filterDrawerIsOpen, navKeywords, fetchingKeywords }) => {

        return <div style={{ position: 'relative' }}>


            <Drawer sx={{ width: 400, display: 'flex', position: 'relative', zIndex: 50 }} open={filterDrawerIsOpen} onClose={toggleFilterDrawer}>
                <div style={{ display: fetchingKeywords ? 'flex' : 'none', width: '100%', height: '100vh', backgroundColor: '#fafafa', position: 'absolute', top: 0, bottom: 0, zIndex: 10000, opacity: 0.7, color: 'black', justifyContent: 'center', alignItems: 'center' }}>  <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="primary" />
                </Box></div>
                {!fetchingKeywords && navKeywords.length > 0 && <KeywordsList style={{ flex: 1 }} />}
            </Drawer>
        </div>
    }}</AppContext.Consumer>
}
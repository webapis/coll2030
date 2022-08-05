
import * as React from 'react';

import KeywordsList from './KeywordsList';
import Drawer from '@mui/material/Drawer';
import { AppContext } from '../App';
export default function KeywordListDrawer() {


    return <AppContext.Consumer>{({ toggleFilterDrawer, filterDrawerIsOpen }) => {

        return <Drawer sx={{ width: 400, display: 'flex' }} open={filterDrawerIsOpen} onClose={toggleFilterDrawer}>
            <KeywordsList style={{ flex: 1 }} />
        </Drawer>
    }}</AppContext.Consumer>
}
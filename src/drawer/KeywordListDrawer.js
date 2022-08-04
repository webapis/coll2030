
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { actions } from '../store/accordionSlice'
import KeywordsList from './KeywordsList';
import Drawer from '@mui/material/Drawer';

export default function KeywordListDrawer() {
    const { displayFilter } = useSelector(state => state.accordion)
    const dispatch = useDispatch()

    return <Drawer sx={{ width: 400, display: 'flex' }} open={displayFilter} onClose={() => { dispatch(actions.setDisplayFilter(false)) }}>
        <KeywordsList style={{ flex: 1 }} />
    </Drawer>
}
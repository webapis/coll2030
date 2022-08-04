
import * as React from 'react';
import { useSelector,useDispatch } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery';
import { actions } from '../store/accordionSlice'
import KeywordsList from './KeywordsList';
import Drawer from '@mui/material/Drawer';

export default function KeywordListDrawer() {
    const { displayFilter } = useSelector(state => state.accordion)
    const dispatch =useDispatch()
    const matchedesktop = useMediaQuery('(min-width:600px)');
    return !matchedesktop && <Drawer  open={displayFilter} onClose={() => { dispatch(actions.setDisplayFilter(false)) }}>
        <KeywordsList />
    </Drawer>
}
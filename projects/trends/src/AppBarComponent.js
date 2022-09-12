import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDispatch } from 'react-redux';
import { actions } from './store/mainSlice'

export default function AppBarComponent() {
    const dispatch = useDispatch()

    function handleCollectedClick() {
        dispatch(actions.toggleCollectedDrawer())
    }
    return (
        <Box >

            <AppBar position="fixed" sx={{zIndex:100000}}>
                
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Trends
                    </Typography>
               
                    <Button color="inherit" onClick={handleCollectedClick}>Collected Data</Button>
                    <Button color="inherit">Accessed Data</Button>
                </Toolbar>
                
            </AppBar>
        </Box>
    );
}

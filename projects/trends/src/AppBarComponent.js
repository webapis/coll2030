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

    function handleCollectedClick(e) {
        const {id}=e.target
        dispatch(actions.setSelectedSlice(id))
    }
    return (
        <Box >

            <AppBar position="fixed" sx={{zIndex:100000}}>
                
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Trends
                    </Typography>
               
                    <Button color="inherit" id='collected-data' onClick={handleCollectedClick}>Collected Data</Button>
                    <Button color="inherit" id='accessed-data'onClick={handleCollectedClick}>Accessed Data</Button>
                    <Button color="inherit" id='keywords' onClick={handleCollectedClick}>Keywords</Button>
                </Toolbar>
                
            </AppBar>
        </Box>
    );
}

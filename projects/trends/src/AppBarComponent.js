import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export default function AppBarComponent() {

    return (
        <Box >

            <AppBar sx={{ zIndex: 100000 }}>

                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Trends
                    </Typography>
                    <Button component={Link} to="/aggregation" color="inherit" id='collected-data' >Aggregation Data</Button>
                    <Button component={Link} to="/analitics" color="inherit" id='accessed-data' >Analitics Data</Button>
                    <Button component={Link} to="/keywords" color="inherit" id='keywords' >Keywords</Button>
                </Toolbar>

            </AppBar>
        </Box>
    );
}


import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function LoadingDialog(props) {



    return <div style={{ width: '100%', height: '100%', backgroundColor: '#546e7a', opacity: 0.7,color:'white' }}>
        <Box>
        <CircularProgress />
        </Box>
      
     </div>



}
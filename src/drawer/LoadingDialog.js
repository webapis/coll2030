
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function LoadingDialog(props) {



    return <div style={{ width: '100%', height: '100vh', backgroundColor: '#fafafa', opacity: 0.7,color:'white',display:'flex',justifyContent:'center',alignItems:'center' }}>
        <Box>
        <CircularProgress />
        </Box>
      
     </div>



}
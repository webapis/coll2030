import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';


export default function SearchInput() {
  return (
    <Container sx={{display:'flex'}}>
        
<TextField fullWidth size="small" />
       <Button>Ara</Button>
    
    </Container>
  );
}
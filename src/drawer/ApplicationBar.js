import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import { AppContext } from '../App';
import SearchBox from './SearchBox';
import { Toolbar } from '@mui/material';
import HorizontalKeywords from './HorizontalKeywords'

export default function AppBarContainer() {

  return (

    <AppContext.Consumer>
      {(({ clearSubcategory, products, navKeywords,setSelectedNavIndex,selectedKeywords }) => {
        return <AppBar color="" position='fixed' elevation={0} >
          <div>

            <Container >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={clearSubcategory}
                >
                  <HomeIcon />
                </IconButton>
                <Button variant="text" onClick={clearSubcategory} color="inherit">     <Typography variant="h6" component="div"    >
                  BİRARADAMODA
                </Typography> </Button>
                {navKeywords && navKeywords.length > 0 && ([ <HorizontalKeywords/>,<SearchBox/>])}
              </Toolbar>

             
              {products.length > 0
              && <div style={{ position: 'relative',display:'flex',justifyContent:'space-around',paddingBottom:3 }}>
                <div style={{display:'flex',justifyContent:'start'}}>
                  {selectedKeywords.map((m, i) => {
                    const { index, keyword } = m
                    debugger
                    return <Chip color='info' key={i} label={m.keyword} onDelete={() => setSelectedNavIndex({ index, keyword })} size="small"/>
                  })}
                </div>
   

              </div>
            }
     

            </Container>
        
           
          </div>


        
       


        </AppBar>
      })}

    </AppContext.Consumer>




  )
}

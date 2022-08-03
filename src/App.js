import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useSelector, useDispatch } from 'react-redux'
import  KeywordListDrawer  from './drawer/KeywordListDrawer'
import useMediaQuery from '@mui/material/useMediaQuery';
import { actions } from './store/accordionSlice'
import TemporaryDrawer from "./drawer/TemporaryDrawer"
import ProductList from './drawer/ProductList'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import KeywordsList from './drawer/KeywordsList';
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer';


export default function HideAppBar(props) {
  const { selectedSubcategory, displayFilter } = useSelector(state => state.accordion)

  const matchedesktop = useMediaQuery('(min-width:600px)');


  const dispatch = useDispatch()
  function handleClick() {

    dispatch(actions.toggleDrawer())
  }
  return (
    <React.Fragment>


      <div>
        <AppBar color="" position='static'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              MODABURADA
            </Typography>
          </Toolbar>

        </AppBar>

      </div>

      <Toolbar />
      <div >
        <TemporaryDrawer />
        <Grid container>
          {matchedesktop && selectedSubcategory && <Grid item xs={2}>
            <KeywordsList />
          </Grid>}
          <KeywordListDrawer />

          <Grid item xs={10}>

            <ProductList />
          </Grid>

        </Grid>

      </div>
    </React.Fragment>
  );
}




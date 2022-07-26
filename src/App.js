import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { useSelector,useDispatch } from 'react-redux'
import KeywordsList from "./drawer/KeywordsList"
import { actions } from './store/accordionSlice'
import TemporaryDrawer from "./drawer/TemporaryDrawer"
import ProductList from './drawer/ProductList'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {
    const { selectedSubcategory, parentKeyword, selectedKeyword } = useSelector(state => state.accordion)

    const dispatch = useDispatch()
    function handleClick() {
   
        dispatch(actions.toggleDrawer())
    }
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
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
      </HideOnScroll>
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>
        <TemporaryDrawer />
                    {selectedSubcategory && !parentKeyword && <KeywordsList />}
                    {parentKeyword && selectedKeyword && <ProductList />}
        </Box>
      </Container>
    </React.Fragment>
  );
}



/*
import * as React from 'react';

import Toolbar from '@mui/material/Toolbar';
import AppBarContainer from "./drawer/AppBar"
import TemporaryDrawer from "./drawer/TemporaryDrawer"
import KeywordsList from "./drawer/KeywordsList"
import { useSelector } from 'react-redux'
import { actions } from './store/accordionSlice'
import ProductList from './drawer/ProductList'
import HideOnScroll from "./drawer/HideOnScroll"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
export default function App(props) {
    const { selectedSubcategory, parentKeyword, selectedKeyword } = useSelector(state => state.accordion)

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBarContainer/>
            </HideOnScroll>
            <Toolbar />
            <Container>
                <Box sx={{ my: 2 }}>
                    <TemporaryDrawer />
                    {selectedSubcategory && !parentKeyword && <KeywordsList />}
                    {parentKeyword && selectedKeyword && <ProductList />}
                </Box>
            </Container>
        </React.Fragment>
    );
}
*/
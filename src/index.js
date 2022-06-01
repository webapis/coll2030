import React from 'react';
import ReactDOM from 'react-dom/client';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import SearchInput from './components/SearchInput';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { useDispatch,useSelector } from 'react-redux';
import { actions } from './store/breadcrumbSlice';

import BreadcrumbContainer from './components/BreadcrumbsContainer'
import Divider from '@mui/material/Divider';
import { Provider } from 'react-redux'
import store from './store/store'
import reportWebVitals from './reportWebVitals';
import FilterResult from './components/FilterResult';
import { Typography } from '@mui/material';
import DrawerComp from './components/DrawerComp';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HideAppBar />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();








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

  const selectedTab =useSelector(state=>state.breadcrumb.selectedTab)
  const subCatTotal =useSelector(state=>state.breadcrumb.subCatTotal)
  const dispatch = useDispatch()


  function handleMenuClick(){
    dispatch(actions.toggleDrawer())
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar >
          <Toolbar>
            <IconButton color="inherit" onClick={() => handleMenuClick({}, { selectTab: 0, selectedTabLabel: 'Ürünler' })}>
              <MenuIcon />
            </IconButton>
            <Typography fontFamily="'Cinzel Decorative', cursive" variant="h5" gutterBottom component="div">
              Hanım Kıyafet
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <HideOnScroll>
        <div style={{ paddingTop: 10, position: 'fixed', width: '100%', zIndex: 20000, backgroundColor: '#fff' }}>
          <SearchInput />
     
          <Container >
            <BreadcrumbContainer />
            {selectedTab === 2 && <Divider sx={{ fontSize: 12, color: '#9e9e9e' }}>{subCatTotal} Ürün Sayısı</Divider>}

          </Container>

        </div>

      </HideOnScroll>
      <Container  sx={{ marginTop: 0, paddingTop: 15 }}>
      
      <FilterResult  />

    <DrawerComp/>
      
      </Container>
    </React.Fragment>
  );
}


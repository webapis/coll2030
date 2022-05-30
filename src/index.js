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
import { useDispatch } from 'react-redux';
import { actions } from './store/breadcrumbSlice';
import TabsContainer from './components/TabsContainer';
import BreadcrumbContainer from './components/BreadcrumbsContainer'
import Divider from '@mui/material/Divider';
import { Provider } from 'react-redux'

import store from './store/store'

import reportWebVitals from './reportWebVitals';


import FilterResult from './components/FilterResult';
import { Typography } from '@mui/material';
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

  const [value, setValue] = React.useState(0);
  const dispatch =useDispatch()

  const handleChange = (event, newValue) => {
    if (newValue === 0) {

      dispatch(actions.selectNavCategory('Ürünler'))
  
    }
    else if (newValue === 1) {
      dispatch(actions.selectNavCategory('Markalar'))


    }
    setValue(newValue);
  };


  const totalSubcategory = localStorage.getItem('totalSubcategory')

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar >
          <Toolbar>
            <IconButton color="inherit" onClick={() => handleChange({}, 0)}>
              <MenuIcon />
            </IconButton>
            <Typography fontFamily="'Cinzel Decorative', cursive"  variant="h5" gutterBottom component="div">
              Hanım Kıyafet
            </Typography>

          </Toolbar>

        </AppBar>
      </HideOnScroll>

      <Toolbar/>

      <HideOnScroll>
        <div style={{ paddingTop: 10, position: 'fixed', width: '100%', zIndex: 20000, backgroundColor: '#fff' }}>
          <SearchInput />
      <TabsContainer value={value} handleChange={handleChange}/>
          <Container > 
      <BreadcrumbContainer/>
          {value===2&& <Divider sx={{fontSize:12,color:'#9e9e9e'}}>{totalSubcategory} Ürün Sayısı</Divider> }
          
          </Container>

        </div>

      </HideOnScroll>
     
      <Container sx={{ marginTop: 0, paddingTop: 15 }}>

        <FilterResult id="123" selectedTab={value} handleChange={handleChange} />

      </Container>
    </React.Fragment>
  );
}

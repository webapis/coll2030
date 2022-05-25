import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import './index.css';

import reportWebVitals from './reportWebVitals';


import FilterResult from './FilterResult';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HideAppBar />
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

  const handleChange = (event, newValue) => {
    if(newValue===0){
      localStorage.setItem('navCategory','Ürünler')
      localStorage.removeItem('category')
      localStorage.removeItem('subcategory')
      localStorage.removeItem('marka')
    } 
    else if(newValue===1){
      localStorage.setItem('navCategory','Marka') 
      localStorage.removeItem('category')
      localStorage.removeItem('subcategory')
      localStorage.removeItem('marka')
    }
    setValue(newValue);
  };

  const navCategory =localStorage.getItem('navCategory')
  const marka =localStorage.getItem('marka')
  const category =localStorage.getItem('category')
  const subcategory =localStorage.getItem('subcategory')

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              MU

            </Typography>
            <Tabs  value={value} onChange={handleChange}    variant="scrollable" scrollButtons allowScrollButtonsMobile sx={{ marginLeft: 'auto' }} textColor="inherit" indicatorColor='secondary'>
              <Tab label="Ürünler" />
              <Tab label="Markalar" />
              <Tab label="Sonuç" />
              <Tab icon={<SearchIcon />} />
            </Tabs>

          </Toolbar>
          <Toolbar>
          <Breadcrumbs aria-label="breadcrumb">
          {navCategory && <Link   underline="hover" color="whitesmoke" href="#" fontSize="small">{navCategory}</Link >}
          {marka && <Link  underline="hover" color="whitesmoke" href="#" fontSize="small">{marka}</Link >}
          {category && <Link underline="hover" color="whitesmoke" href="#" fontSize="small" >{category}</Link >}
          {subcategory && <Link  underline="hover" color="whitesmoke" href="#" fontSize="small">{subcategory}</Link >}
      
      </Breadcrumbs>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container sx={{padding:2}}>
      

          <FilterResult id="123" selectedTab={value} handleChange={handleChange}/>
       
      </Container>
    </React.Fragment>
  );
}

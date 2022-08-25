import * as React from 'react';
import subcategories from './category-nav.json'
import KeywordListDrawer from './drawer/KeywordListDrawer'
import TemporaryDrawer from "./drawer/TemporaryDrawer"
import ProductList from './drawer/ProductList'
import ApplicationBar from './drawer/ApplicationBar';
import KeywordsList from './drawer/KeywordsList';
import Grid from '@mui/material/Grid'
import { Stack } from '@mui/material';
import LoadingDialog from './drawer/LoadingDialog';
debugger

debugger
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHandled = false
    var prevScrollpos = window.pageYOffset;
    window.addEventListener('scroll', () => {

      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        //  document.getElementById("navbar").style.top = "0";

        // document.getElementById('static-nav').style.visibility = "visible"

      } else {

        //document.getElementById("navbar").style.top = "-260px";

        // document.getElementById('static-nav').style.visibility = "hidden"
      }
      prevScrollpos = currentScrollPos;

      var myButtom = document.getElementById('nav-top-btn')
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButtom.style.display = "block";
      } else {
        myButtom.style.display = "none";
      }

      if ((window.innerHeight + window.scrollY) + 2000 >= document.body.offsetHeight && this.scrollHandled === false) {
        this.scrollHandled = true
        const hasMore = this.state.products.length < this.state.availableProducts
        if (hasMore) {
          debugger
          this.fetchProducts(this.state.startAt)
        }



        console.log('reached bottom of the page')
        // you're at the bottom of the page
      }




    })
    this.toggleDrawer = (open) => {
      this.setState(state => ({
        open: !state.open
      }));
    };
    this.toggleFilterDrawer = (open) => {
      this.setState(state => ({
        ...state, filterDrawerIsOpen: !state.filterDrawerIsOpen
      }));
    };

    this.selectSubcategory = ({ subcategory, totalSubcategory, node }) => {

      this.setState(state => ({
        ...state, selectedSubcategory: { subcategory, totalSubcategory, node }, open: false
      }));
    }

    this.setSelectedNavIndex = ({ keyword, index }) => {
      this.setState(function (state) {
        const indexExist = state.selectedNavIndex.split('-').find(f => index !== "" && index.replace('-', "") === f)
        let selectedNavIndex = null
        let selectedKeywords = null
        if (indexExist) {

          selectedNavIndex = state.selectedNavIndex.split('-').filter(f => f !== "" && f !== indexExist).map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
          selectedKeywords = state.selectedKeywords.filter(f => f.index !== index)
        }
        else {

          selectedNavIndex = state.selectedNavIndex.concat(index).split('-').filter(f => f !== "").map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
          selectedKeywords = [...state.selectedKeywords, { keyword, index }]
        }
        return { ...state, startAt: 0, selectedNavIndex, selectedKeywords, fetchingKeywords: true }
      })
    }

    this.state = {
      selectedSubcategory: null,
      products: [],
      fetchingProduct: false,
      matchedesktop: (600 < window.innerWidth),
      open: false,
      toggleDrawer: this.toggleDrawer,
      subcategories: [], selectSubcategory: this.selectSubcategory,
      startAt: 0,
      selectedMarka: '',
      selectedNavIndex: '',
      selectedKeywords: [],
      navKeywords: [],
      availableProducts: 0,
      toggleFilterDrawer: this.toggleFilterDrawer, filterDrawerIsOpen: false,
      setSelectedNavIndex: this.setSelectedNavIndex
    }
  }

  componentDidMount() {
    this.loadSubcategories()
  }
  componentDidUpdate(prevProps, prevState) {
    const { selectedSubcategory, selectedNavIndex, startAt } = this.state
    if ((selectedSubcategory && prevState.selectedSubcategory === null)) {
      this.setState((state) => ({ ...state, fetchingProduct: true }))
      this.fetchProducts(0)
      this.fetchNavKeywords('0-',selectedSubcategory.subcategory)
    }

    if ((selectedSubcategory && prevState.selectedNavIndex !== selectedNavIndex)) {
      this.setState((state) => ({ ...state, fetchingProduct: true, products: [], fetchingKeywords: true }))
      this.fetchProducts(startAt)
      if (selectedNavIndex === '') {
        this.fetchNavKeywords('0-',selectedSubcategory.subcategory)
      } else {


    debugger
        this.fetchNavKeywords(selectedNavIndex,selectedSubcategory.subcategory)
     

      }

    }
  }
  loadSubcategories() {
    this.setState(state => ({ ...state, subcategories }))
  }

  fetchProducts(start) {
    let host = 'https://dream-gules.vercel.app/'// 'http://localhost:3001/'  //
    const { selectedSubcategory: { subcategory}, selectedNavIndex } = this.state

    var url = `${host}api/fns/${subcategory}/${subcategory}?start=` + start +  '&selectedNavIndex=' + selectedNavIndex
    debugger

    return fetch(url, { cache: 'default' }).then(function (response) { 
      
      debugger
      
      return response.json() }).then(function (data) {
      return data
    })
      .then((data) => {
        debugger
        debugger
        const { data: products, count } = data
        debugger

        this.setState(state => ({
          ...state, products: state.startAt === 0 ? products : [...state.products, ...products], fetchingProduct: false, availableProducts: count, startAt: state.startAt + products.length
        }))
        this.scrollHandled = false

      })
      .catch(function (err) {
debugger
        console.log('err', err)
        return err
      })


  }

  fetchNavKeywords(selectedNavIndex,subcategory) {

    let host = 'https://dream-gules.vercel.app/'// 'http://localhost:3001/'  //
    var url = ''
    const fn = parseInt(selectedNavIndex.replace(/-/g, '').trim()) % 2
    debugger
    if (selectedNavIndex === '') {
      url = `${host}api/fns/${subcategory}/navfirst?navindex=0-`
    } else {

      if (fn === 1) {
        debugger
        url = `${host}api/fns/${subcategory}/navsecond?navindex=${selectedNavIndex}`
      } else {
        debugger
        url = `${host}api/fns/${subcategory}/navfirst?navindex=${selectedNavIndex}`
      }

    }
    debugger
    fetch(url).then(async (response) => response.json()).then((data) => {
      const { keywords } = data
      debugger
      this.setState((state) => ({ ...state, fetchingKeywords: false, navKeywords: keywords }))
    }).catch(err => {
      debugger
    })

  }
  render() {
    const { matchedesktop, selectedSubcategory, fetchingKeywords, fetchingProduct } = this.state

    return (<AppContext.Provider value={this.state}>
      <ApplicationBar />
      <TemporaryDrawer />
      {matchedesktop && selectedSubcategory &&
        <Stack>
          <Grid container>
            <Grid item xs={2} sx={{ paddingLeft: 5 }}>
              <KeywordsList />
            </Grid>
            <Grid item xs={10}>
              <ProductList />
            </Grid>
          </Grid>
        </Stack>
      }

      {!matchedesktop && (<div><KeywordListDrawer style={{ width: 300 }} /> <ProductList /></div>)}
      {fetchingProduct || fetchingKeywords && <LoadingDialog loading={true} />}

    </AppContext.Provider>)
  }
}




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

    this.selectSubcategory = ({ subcategory, totalSubcategory }) => {
      this.setState(state => ({
        ...state, selectedSubcategory: { subcategory, totalSubcategory }, open: false
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
      this.fetchNavKeywords('start')
    }

    if ((selectedSubcategory && prevState.selectedNavIndex !== selectedNavIndex)) {
      this.setState((state) => ({ ...state, fetchingProduct: true, products: [], fetchingKeywords: true }))
      this.fetchProducts(startAt)
      if (selectedNavIndex === '') {
        this.fetchNavKeywords('start')
      } else {
        setTimeout(() => {
          this.fetchNavKeywords(selectedNavIndex)
        }, 100)

      }

    }
  }
  loadSubcategories() {
    this.setState(state => ({ ...state, subcategories }))
  }

  fetchProducts(start) {

    const { selectedSubcategory: { subcategory }, selectedMarka, selectedNavIndex } = this.state

    var url = '/api/kadin/data?start=' + start + '&subcategory=' + subcategory + '&marka=' + selectedMarka + '&selectedNavIndex=' + selectedNavIndex


    return fetch(url, { cache: 'default' }).then(function (response) { return response.json() }).then(function (data) {
      return data
    })
      .then((data) => {
        var products = data.data

        //const fetchAllComplete = [...products, ...collection].length === totalKeyword
        this.setState(state => ({
          ...state, products: state.startAt === 0 ? products : [...state.products, products], fetchingProduct: false
        }))

      })
      .catch(function (err) {

        console.log('err', err)
        return err
      })


  }

  fetchNavKeywords(selectedNavIndex) {


    var url = `/api/kadin/nav?navindex=${selectedNavIndex}`

    fetch(url).then((response) => response.json()).then(navKeywords => {


      this.setState((state) => ({ ...state, fetchingKeywords: false, navKeywords }))

    })




  }
  render() {
    const { matchedesktop, selectedSubcategory,fetchingKeywords,fetchingProduct } = this.state

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
      {fetchingProduct || fetchingKeywords &&  <LoadingDialog loading={true} /> }
     
    </AppContext.Provider>)
  }
}




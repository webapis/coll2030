import * as React from 'react';
import subcategories from './category-nav.json'
import KeywordListDrawer from './drawer/KeywordListDrawer'
import TemporaryDrawer from "./drawer/TemporaryDrawer"
import ProductList from './drawer/ProductList'
import ApplicationBar from './drawer/ApplicationBar';
import KeywordsList from './drawer/KeywordsList';
import Grid from '@mui/material/Grid'
import { Stack, Container, Typography } from '@mui/material';
import LoadingDialog from './drawer/LoadingDialog';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
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
        ...state, startAt: 0,
        selectedMarka: '',
        selectedNavIndex: '',
        selectedKeywords: [],
        navKeywords: [],
        products: [],
        fetchingProduct: false,
        availableProducts: 0, selectedSubcategory: { subcategory, totalSubcategory, node }, open: false
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
    debugger
    if ((selectedSubcategory && prevState.selectedSubcategory === null)) {
      debugger
      this.setState((state) => ({ ...state, fetchingProduct: true }))
      this.fetchProducts(0)
      this.fetchNavKeywords('0-', selectedSubcategory.subcategory)
    }


    if (selectedSubcategory && prevState.selectedSubcategory !== null && selectedSubcategory.subcategory !== prevState.selectedSubcategory.subcategory) {
      debugger
      this.setState((state) => ({ ...state, fetchingProduct: true }))
      this.fetchProducts(0)
      this.fetchNavKeywords('0-', selectedSubcategory.subcategory)
    }

    if ((selectedSubcategory && prevState.selectedNavIndex !== selectedNavIndex)) {
      this.setState((state) => ({ ...state, fetchingProduct: true, products: [], fetchingKeywords: true }))
      this.fetchProducts(startAt)
      if (selectedNavIndex === '') {
        this.fetchNavKeywords('0-', selectedSubcategory.subcategory)
      } else {


        debugger
        this.fetchNavKeywords(selectedNavIndex, selectedSubcategory.subcategory)


      }

    }
  }
  loadSubcategories() {
    this.setState(state => ({ ...state, subcategories }))
  }

  fetchProducts(start) {
    const { selectedSubcategory: { subcategory }, selectedNavIndex } = this.state
    let host = ''
    let href = window.location.href
    debugger
    if (href === 'http://localhost:3000/') {
      host = 'http://localhost:8888/.netlify/functions'
    } else {
      host = `https://coll2030.vercel.app/api/fns`//'https://dream2022.netlify.app/.netlify/functions'
    }



    var url = `${host}/${subcategory}/?start=` + start + '&selectedNavIndex=' + selectedNavIndex
    debugger

    return fetch(url, { cache: 'default' }).then(function (response) {

      debugger

      return response.json()
    }).then(function (data) {
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

  fetchNavKeywords(selectedNavIndex, subcategory) {
    let host = ''
    let href = window.location.href
    debugger
    if (href === 'http://localhost:3000/') {
      host = 'http://localhost:8888/.netlify/functions'
    } else {
      host = `https://coll2030.vercel.app/api/fns` //'https://dream2022.netlify.app/.netlify/functions'
    }

    var url = ''
    const fn = parseInt(selectedNavIndex.replace(/-/g, '').trim()) % 2

    if (selectedNavIndex === '') {
      url = `${host}/${subcategory}-navfirst?navindex=0-`
    } else {

      if (fn === 1) {

        url = `${host}/${subcategory}-navsecond?navindex=${selectedNavIndex}`
      } else {

        url = `${host}/${subcategory}-navfirst?navindex=${selectedNavIndex}`
      }

    }
    debugger

    fetch(url).then(async (response) => response.json()).then((data) => {
      const { keywords } = data

      this.setState((state) => ({ ...state, fetchingKeywords: false, navKeywords: keywords }))
    }).catch(err => {

    })

  }
  render() {
    const { matchedesktop, selectedSubcategory, fetchingKeywords, fetchingProduct, subcategories, selectSubcategory ,products} = this.state

    return (<AppContext.Provider value={this.state}>
      <ApplicationBar />
      <TemporaryDrawer />
      { products.length===0&& <Container>
        <Typography align="center" variant="h5">Ürünler</Typography>
        <ImageList sx={{ height:'80vh',  justifyContent: 'center', display:'flex' }} cols={3} rowHeight={164}>
          {subcategories.map((item) => {
            const { subcategory, node, count: totalSubcategory } = item
            return <ImageListItem sx={{width:200}} key={item.img} onClick={() => {
              selectSubcategory({ subcategory, totalSubcategory, node })
            }}>

              <img
                src={item.imgUrl}
                alt={item.subcategory}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.subcategory}
                position="below"
              />
            </ImageListItem>
          })}
        </ImageList>
      </Container>
  }
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
      {(fetchingProduct || fetchingKeywords) && <LoadingDialog loading={true} />}
   
    </AppContext.Provider>)
  }
}




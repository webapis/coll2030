import * as React from 'react';

import KeywordListDrawer from './drawer/KeywordListDrawer'
import TemporaryDrawer from "./drawer/TemporaryDrawer"
import ProductList from './drawer/ProductList'
import ApplicationBar from './drawer/ApplicationBar';
import KeywordsList from './drawer/KeywordsList';
import Grid from '@mui/material/Grid'
import { Container, Typography } from '@mui/material';
import SubcategoryCard from './drawer/SubcategoryCard';
import keywordgroup from './keywords.json'
import imageIndexes from './image-indexes.json'
import subcatObj from './category-nav.json'
import ImageList from '@mui/material/ImageList';
const subcategories = Object.entries(subcatObj)


console.log('keywordgroup', keywordgroup)

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
    this.clearSubcategory = () => {
      this.setState(state => ({
        ...state, startAt: 0,
        selectedMarka: '',
        selectedNavIndex: '',
        selectedKeywords: [],
        navKeywords: [],
        availableProducts: 0,
        selectedSubcategory: null,
        products: [],
        fetchingProduct: false,
        open: false,
        productImgIndexes: null
      }));

    }
    this.searchInputChanged = (e) => {
      const { value } = e.target

      this.setState(state => ({
        ...state,
        search: value,

      }));
    }
    this.searchProduct = () => {
      const { selectedSubcategory: { subcategory } } = this.state
      this.setState((state) => ({
        ...state, startAt: 0,
        selectedMarka: '',
        selectedNavIndex: '',
        selectedKeywords: [],
        navKeywords: [],
        products: [], fetchingProduct: true
      }))
      this.fetchProducts(0)
      this.fetchNavKeywords('0-', subcategory)
    }
    this.selectSubcategory = ({ functionName,index, totalSubcategory, node }) => {

      
      this.setState(state => ({
        ...state, startAt: 0,
        selectedMarka: '',
       // selectedNavIndex: '',
        selectedKeywords: [],
        navKeywords: [],
        products: [],
        fetchingProduct: false,
        availableProducts: 0, selectedSubcategory: { subcategory:functionName, totalSubcategory, node },selectedNavIndex:index, open: false
      }));
    }
    this.setProductImageInexes = ({ productImgIndexes }) => {

      this.setState(function (state) {

        return { ...state, productImgIndexes }
      })
    }
    this.setSelectedNavIndex = ({ keyword, index }) => {
      window.scrollTo(0, 0)
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
      search: '',
      productImgIndexes: null,
      toggleFilterDrawer: this.toggleFilterDrawer, filterDrawerIsOpen: false,
      setSelectedNavIndex: this.setSelectedNavIndex,
      clearSubcategory: this.clearSubcategory,
      searchInputChanged: this.searchInputChanged,
      searchProduct: this.searchProduct,
      setProductImageInexes:this.setProductImageInexes
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
      this.fetchNavKeywords('0-', selectedSubcategory.subcategory, selectedSubcategory.node)
    }


    if (selectedSubcategory && prevState.selectedSubcategory !== null && selectedSubcategory.subcategory !== prevState.selectedSubcategory.subcategory) {

      this.setState((state) => ({ ...state, fetchingProduct: true }))
      this.fetchProducts(0)
      this.fetchNavKeywords('0-', selectedSubcategory.subcategory, selectedSubcategory.node)
    }

    if ((selectedSubcategory && prevState.selectedNavIndex !== selectedNavIndex)) {
      this.setState((state) => ({ ...state, fetchingProduct: true, products: [], fetchingKeywords: true }))
      this.fetchProducts(startAt)
      if (selectedNavIndex === '') {
        this.fetchNavKeywords('0-', selectedSubcategory.subcategory, selectedSubcategory.node)
      } else {
        this.fetchNavKeywords(selectedNavIndex, selectedSubcategory.subcategory, selectedSubcategory.node)
      }

    }
  }
  loadSubcategories() {
    this.setState(state => ({ ...state, subcategories }))
  }

  async fetchProducts(start) {
    const { selectedSubcategory: { subcategory }, selectedNavIndex, search } = this.state
     let productImgIndexes=null
    if (imageIndexes[selectedNavIndex] !== undefined) {

      const response = await fetch(`/image-indexes/${selectedNavIndex}.json`)
      
       productImgIndexes = await response.json()


      console.log('data elngt', productImgIndexes)
      
    }

    let host = ''
    let href = window.location.href
    if (href === 'http://localhost:8888/') {
      host = 'http://localhost:8888/.netlify/functions'
    } else {
      host = `https://coll2030.netlify.app/.netlify/functions`
    }
    //'https://dream2022.netlify.app/.netlify/functions'


    var url = `${host}/${subcategory.replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/ğ/g, 'g')}/?start=` + start + '&selectedNavIndex=' + selectedNavIndex + '&search=' + search


    const response = await fetch(url, { cache: 'default' })
    const data = await response.json()

    const { data: products, count } = data


    this.setState(state => ({
      ...state, products: state.startAt === 0 ? products : [...state.products, ...products], fetchingProduct: false, availableProducts: count, startAt: state.startAt + products.length,productImgIndexes
    }))
    this.scrollHandled = false

    return

  }

  async fetchNavKeywords(selectedNavIndex, subcategory) {
    let subcat = subcategory.replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    let host = ''
    let href = window.location.href

    if (href === 'http://localhost:8888/') {
      host = 'http://localhost:8888/.netlify/functions'
    } else {

      host = 'https://coll2030.netlify.app/.netlify/functions'             //`https://${node}.vercel.app/api/fns` 

    }

    var url = ''
    const fn = parseInt(selectedNavIndex.replace(/-/g, '').trim()) % 2

    if (selectedNavIndex === '') {
      url = `${host}/${subcat}-navfirst?navindex=0-`
    } else {

      if (fn === 1) {

        url = `${host}/${subcat}-navsecond?navindex=${selectedNavIndex}`
      } else {

        url = `${host}/${subcat}-navfirst?navindex=${selectedNavIndex}`
      }

    }


    const response = await fetch(url)

    const data = await response.json()

    this.setState(function (state) {
      const { keywords } = data
      const grouped = {}

      for (let kw of keywords) {

        const k = kw[2]

        const groupName = keywordgroup[k]
        if (grouped[groupName] === undefined) {

          grouped[groupName] = { keywords: [kw] }

        } else {

          grouped[groupName].keywords = [...grouped[groupName].keywords, kw]
        }


      }

      return {
        ...state, fetchingKeywords: false, navKeywords: Object.entries(grouped).map(m => { return { groupName: m[0], keywords: m[1].keywords } }).sort(function (a, b) {
          var textA = a.groupName;
          var textB = b.groupName;

          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
      }
    })

  }
  render() {
    const { matchedesktop, selectedSubcategory, fetchingKeywords, fetchingProduct, subcategories, selectSubcategory, products } = this.state

    return (<AppContext.Provider value={this.state}>
      <ApplicationBar />
      <TemporaryDrawer />

      {products.length === 0 && !fetchingProduct && <Container sx={{ marginTop: 10 }}>
      <Typography align="center" variant="h5">Ürün Kategorileri</Typography>
         
     <ImageList  sx={{ }}cols={6} gap={8}
    variant="masonry" 
     >
            {subcategories.map((item, i) => {
              const description = item[0]
              const indexes = item[1]
                 return <div > <SubcategoryCard selectSubcategory={selectSubcategory} indexes={indexes}/></div>
                
            })}
         
         </ImageList >
    
      </Container>
      }
      {matchedesktop && selectedSubcategory &&
        <Container>
          <Grid container>
            <Grid item xs={3} >
              <KeywordsList />
            </Grid>
            <Grid item xs={9}>
              <ProductList />
            </Grid>
          </Grid>
        </Container>
      }

      {!matchedesktop && (<div><KeywordListDrawer style={{ width: 300 }} /> <ProductList /></div>)}
     

    </AppContext.Provider>)
  }
}




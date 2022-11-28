import * as React from 'react';

import KeywordListDrawer from './drawer/KeywordListDrawer'
import TemporaryDrawer from "./drawer/TemporaryDrawer"
import ProductList from './drawer/ProductList'
import ApplicationBar from './drawer/ApplicationBar';
import KeywordsList from './drawer/KeywordsList';
import Grid from '@mui/material/Grid'
import { Container } from '@mui/material';

import keywordgroup from './keywords.json'

import subcatObj from './category-nav-counter.json'
import { Helmet } from "react-helmet";
import CategoryNavContainer from './drawer/CategoryNavContaıner';
import TabContainer from './drawer/TabContainer';
const subcategories = Object.entries(subcatObj)
const categories = Object.values(subcatObj).flat()


export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHandled = false
    var prevScrollpos = window.pageYOffset;
    window.addEventListener('scroll', () => {

      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        //  document.getElementById("navbar").style.top = "63px";

        //  document.getElementById('navbar').style.visibility = "visible"

      } else {

        //  document.getElementById("navbar").style.top = "-260px";

        // document.getElementById('navbar').style.visibility = "hidden"
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
    this.selectSubcategory = ({ functionName, index, totalSubcategory, keywordType, groupName }) => {

      this.setState(state => ({
        ...state, startAt: 0,
        selectedMarka: '',
        selectedKeywords: [],
        navKeywords: [],
        products: [],
        fetchingProduct: false,
        availableProducts: 0, selectedSubcategory: { subcategory: functionName, totalSubcategory }, groupName, keywordType, selectedNavIndex: index, open: false
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
        return { ...state, startAt: 0, selectedNavIndex, selectedKeywords, fetchingKeywords: true, indexTab: 0 }
      })
    }
    this.setSelectedFilterTab = (event, value) => {

      this.setState((prevState) => {
        return { ...prevState, selectedFiterTab: value }
      })
    }
    this.setIndexTab = (event, value) => {
      const { id } = event.currentTarget
      console.log('id', id)
      this.setState((prevState) => {
        return { ...prevState, indexTab: value, indexTabName: id }
      })
    }
    this.state = {
      indexTabName: 'Tümü',
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
      selectedFiterTab: 0,
      indexTab: 0,
      setIndexTab: this.setIndexTab,
      setSelectedFilterTab: this.setSelectedFilterTab,
      toggleFilterDrawer: this.toggleFilterDrawer, filterDrawerIsOpen: false,
      setSelectedNavIndex: this.setSelectedNavIndex,
      clearSubcategory: this.clearSubcategory,
      searchInputChanged: this.searchInputChanged,
      searchProduct: this.searchProduct,
      setProductImageInexes: this.setProductImageInexes
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
      //  this.fetchNavKeywords('0-', selectedSubcategory.subcategory, selectedSubcategory.node)
      this.fetchNavKeywords(selectedNavIndex, selectedSubcategory.subcategory, selectedSubcategory.node)
    }


    if (selectedSubcategory && prevState.selectedSubcategory !== null && selectedSubcategory.subcategory !== prevState.selectedSubcategory.subcategory) {

      this.setState((state) => ({ ...state, fetchingProduct: true }))
      //  this.fetchProducts(0)
      this.fetchNavKeywords('0-', selectedSubcategory.subcategory, selectedSubcategory.node)
    }

    if ((selectedSubcategory && prevState.selectedNavIndex !== "" && prevState.selectedNavIndex !== selectedNavIndex)) {

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
    try {


      const { selectedSubcategory: { subcategory }, selectedNavIndex, search } = this.state

      let host = ''
      let href = window.location.href
      if (href === 'http://localhost:8888/') {
        host = 'http://localhost:8888/.netlify/functions'
      } else {
        if (href !== 'https://www.biraradamoda.com') {
          host = 'https://development--coll2030.netlify.app/.netlify/functions'
        } else {
          host = 'https://coll2030.netlify.app/.netlify/functions'
        }


      }





      var url = `${host}/${subcategory.replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/ğ/g, 'g')}/?start=` + start + '&selectedNavIndex=' + selectedNavIndex + '&search=' + search


      const response = await fetch(url, { cache: 'default' })
      const data = await response.json()


      const { data: products, count } = data


      this.setState(state => ({
        ...state, products: state.startAt === 0 ? products : [...state.products, ...products], fetchingProduct: false, availableProducts: count, startAt: state.startAt + products.length
      }))
      this.scrollHandled = false

      return

    } catch (error) {

    }

  }

  async fetchNavKeywords(selectedNavIndex, subcategory) {


    let productImgIndexes
    let subcat = subcategory.replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/ğ/g, 'g')
    let host = ''
    let href = window.location.href

    if (href === 'http://localhost:8888/') {
      host = 'http://localhost:8888/.netlify/functions'
    } else {
      if (href !== 'https://www.biraradamoda.com') {
        host = 'https://development--fashion2023.netlify.app/.netlify/functions'
      } else {
        host = 'https://fashion2023.netlify.app/.netlify/functions'
      }


    }

    var url = ''
    const fn = parseInt(selectedNavIndex.replace(/-/g, '').trim()) % 2

    if (selectedNavIndex === '') {
      url = `${host}/${subcat}-navfirst?navindex=0-`
    } else {
      if (selectedNavIndex !== '0-') {

        const indexes = selectedNavIndex.split('-').filter(f => f !== '')

        let indexFound = null

        try {
          for (let b in keywordgroup) {
            const currentIndex = b.split('-').filter(f => f !== '')
            indexFound = indexes.find(f => {

              return currentIndex.includes(f)
            })
            if (indexFound) {
              const imageIndexesResponse = await fetch(`/image-indexes/${indexFound}.json`)
              productImgIndexes = await imageIndexesResponse.json()
            }


          }
        } catch (error) {
          console.log('error--------', error)
          console.log('indexFound--------', indexFound)
        }

      } else {

      }

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

        const keywordIndex = kw[1]


        const groupName = keywordgroup[keywordIndex]['groupName']
        const keywordTitle = keywordgroup[keywordIndex]['title']


        const keywordWithTitle = [...kw, keywordTitle]

        if (grouped[groupName] === undefined) {

          grouped[groupName] = { keywords: [keywordWithTitle] }

        } else {

          grouped[groupName].keywords = [...grouped[groupName].keywords, keywordWithTitle]

        }




      }

      categories.forEach(c => {
        const groupExist = grouped[c.groupName]

        if (groupExist) {
          delete grouped[c.groupName]
        }


      })



      return {
        ...state, fetchingKeywords: false, productImgIndexes, navKeywords: Object.entries(grouped).map(m => {

          return { groupName: m[0], keywords: m[1].keywords }
        }).sort(function (a, b) {
          var textA = a.groupName;
          var textB = b.groupName;

          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
      }


    })

  }
  render() {
    const { matchedesktop, selectedSubcategory, fetchingProduct, subcategories, selectSubcategory, products } = this.state

    return (<AppContext.Provider value={this.state}>
      <Helmet>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description"
          content={ new Date().toLocaleDateString()+" Moda markaları tek yerde ara. İstediğin giyim ürünü hızlı ve anında bul. Fiyat karşılaştır. Markadan satın al."} />
        <title>Tüm Marka Giyimler bir arada - BİRARADAMODA</title>
      </Helmet>
      <ApplicationBar />
      <TemporaryDrawer />

      <CategoryNavContainer selectSubcategory={selectSubcategory} subcategories={subcategories} fetchingProduct={fetchingProduct} products={products} />
      {matchedesktop && selectedSubcategory &&
        <Container>
          <Grid
            container
            spacing={0}
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid xs={2} item >
              <KeywordsList />
            </Grid>
            <Grid xs={10} item style={{ display: 'flex', flexDirection: 'column', marginTop: 40 }}>
              <ProductList />
            </Grid>
          </Grid>
        </Container>
      }

      {!matchedesktop && (<div><KeywordListDrawer style={{ width: 300 }} /> <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}> <TabContainer /><ProductList /></div>  </div>)}


    </AppContext.Provider>)
  }
}




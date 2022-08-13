require('dotenv').config()
var TAFFY = require('taffy');

const { productTitleMatch } = require('../api/kadin/productTitleMatch')
const { orderData } = require('../api/kadin/orderData')
// Create a new database a single object (first record)
const data = require('../api/_files/kadin/data.json')

const allkeywords = require(`${process.cwd()}/api/_files/kadin/keywords.json`)
module.exports = (req, res) => {
  const { subcategory, start, marka, search, selectedNavIndex } = req.query
  debugger
  const startAt = parseInt(start)
  var products = TAFFY(data);
  
  const filterBySub = subcategory === 'undefined' ? {} : { subcategory }


  const filterByKeyword = selectedNavIndex === '' ? function () { return true } : function filterByKeyword() {
    const marka =this.marka
    let splittedKeywordsIndex = selectedNavIndex.split('-').filter(f=>f!=='')
    let foundkeywords = allkeywords[subcategory].filter(function(f)  {

      const includes = splittedKeywordsIndex.includes(f.index)
   
      return includes
     })

    const title = this.title
  

    const match = foundkeywords.filter(kws => {
      let exactmatch = kws.exactmatch
      let negwords = kws.negwords
      let nws = []
      if (negwords) {
        nws = negwords.split(',')

      }
  
      const kw = kws.keyword
      
      return productTitleMatch({ kw, title, exactmatch, nws })
    })

    

    return match.length=== foundkeywords.length
  }


  


  const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(search, 'i') } }
  const filterByMarka = marka === '' ? {} : { marka }

  var filteredData = products().filter(filterBySearch).filter(filterBySub).filter(filterByKeyword).get()
//  var filteredData = products().filter(filterBySearch).filter(filterBySub).filter(filterByKeyword).get()
  debugger
  var orderedData = orderData(filteredData)
  var orderedDb = TAFFY(orderedData)

  var d = orderedDb().start(startAt).limit(100).get()
  let count = orderedDb().count()



  console.log('data.length', d.length)
  console.log('subcatregex', filterBySub)

  console.log('search', filterBySearch)
  console.log('marka', marka)
  console.log('startAt', startAt)
  console.log('count1', count)
  debugger
  ;
  res.status(200).json({ data: d, count })

}



  // for (let f in filterBySub) {
    //     const current = filterBySub[f]
    //     if (current === 'null') {
    //         ;
    //         delete filterBySub[f]
    //     }
    // }
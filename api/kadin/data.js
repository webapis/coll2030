require('dotenv').config()
var TAFFY = require('taffy');
const { productTitleMatch } = require('./productTitleMatch')
const { orderData } = require('./orderData')
// Create a new database a single object (first record)
const data = require('../_files/kadin/data.json')
const fs = require('fs')
module.exports = (req, res) => {
  const { subcategory, start, marka, search, keyword, parentKeyword } = req.query
  const startAt = parseInt(start)
  var products = TAFFY(data);
  const filterBySub = subcategory === '' ? {} : { subcategory }

  const filterByKeyword = keyword === '' ? function () { return true } : function () {
    const title = this.title
    const allkeywords = fs.existsSync(`${process.cwd()}/api/_files/kadin/keywords.json`) && require(`${process.cwd()}/api/_files/kadin/keywords.json`)
    const kws = allkeywords[subcategory][parentKeyword].childkeywords.find(f => f.keyword === keyword)


    let exactmatch = kws.exactmatch
    let negwords = kws.negwords
    let nws = []
    if (negwords) {
      nws = negwords.split(',')

    }

    const kw = kws.keyword
    if (title) {

    } else {
      debugger
    }
    const match = productTitleMatch({ kw, title, exactmatch, nws })
    return match
  }


  debugger


  const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(search, 'i') } }
  const filterByMarka = marka === '' ? {} : { marka }

  var filteredData = products().filter(filterByMarka).filter(filterBySearch).filter(filterBySub).filter(filterByKeyword).get()

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
  debugger;
  res.status(200).json({ data: d, count })
}



  // for (let f in filterBySub) {
    //     const current = filterBySub[f]
    //     if (current === 'null') {
    //         debugger;
    //         delete filterBySub[f]
    //     }
    // }
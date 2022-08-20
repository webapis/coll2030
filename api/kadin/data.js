require('dotenv').config()
var TAFFY = require('taffy');

const { productTitleMatch } = require('./productTitleMatch')
const { orderData } = require('./orderData')
// Create a new database a single object (first record)
const data = require('../_files/kadin/data.json')

const allkeywords = require(`${process.cwd()}/api/_files/nav/keywords.json`)
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
    const priceNew =this.priceNew
  

    const match = foundkeywords.filter(kws => {
      let group = kws.group
      let negwords = kws.negwords
      let exactmatch = kws.exactmatch
          if (group === 'FIYAT ARALIĞI') {
            const priceRange = kws.keyword.split('-').map(m => parseInt(m).toFixed(2))
            const startPrice =parseFloat( priceRange[0]) 
            const endPrice =parseFloat( priceRange[1])
            try {
              const price =priceNew.toString().replace('.', '').replace(',', '.')
              const productPrice = parseFloat(price)
              //      const productPrice = parseFloat(priceNew.replace('.','').replace(',','.'))
              if (endPrice) {

                if (productPrice >= startPrice && productPrice <= endPrice) {
                  return true
                } else {
                  return false;
                }

              }
              else {
                debugger
                if (productPrice >= startPrice) {
                  return true
                } else {

                  return false
                }

              }
            } catch (error) {
              debugger
            }
         
        
         

           

          } else {

            let nws = []
          
            if (negwords) {
              nws = negwords.split(',')

            }
            const kw = kws.keyword
            const match = productTitleMatch({ kw, title, exactmatch, nws })
            return match
          }
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
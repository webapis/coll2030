require('dotenv').config()
var TAFFY = require('taffy');

const { orderData } = require('./orderData')
// Create a new database a single object (first record)
const data = require('../_files/kadin/data.json')

module.exports = (req, res) => {
  const { subcategory, start, marka, search, keyword } = req.query
  const startAt = parseInt(start)
  var products = TAFFY(data);
  const filterBySub = subcategory === '' ? {} : { subcategory }

  const filterByKeyword = keyword === 'null' ? function () { return true } : function () {
    const title = this.title
    const match =keyword.replace('^','').replace(/\s/g,',').split(',').every(function(k){
      const fullmatch = keyword.indexOf('^')!==-1
  
      if(fullmatch){
      return   title.toLowerCase().replace(/\s/g,',').split(',').filter(f=> f===k).length>0
      }else{
      return   title.toLowerCase().replace(/\s/g,',').split(',').filter(f=> f===k || f.indexOf(k)===0  ).length>0
      }
   
    })

    return match
  }





  const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(search, 'i') } }
  const filterByMarka = marka === 'null' ? {} : { marka }

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
require('dotenv').config()
var TAFFY = require('taffy');

const { orderData } = require('./orderData')
// Create a new database a single object (first record)
const data = require('../_files/kadin/data.json')

module.exports = (req, res) => {
  const { subcategory, start, marka, search } = req.query
  const startAt = parseInt(start)
  var products = TAFFY(data);
  const filterBySub = subcategory === '' ? {} : { subcategory }

 // const filterByCat = categoryregex === '' ? {} : { title: { regex: new RegExp(categoryregex, "i") } }

  debugger;


  const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(search, 'i') } }
  const filterByMarka = marka === 'null' ? {} : { marka }
  debugger;
  var filteredData = products().filter(filterByMarka).filter(filterBySearch).filter(filterBySub).get()


  var orderedData = orderData(filteredData)
  var orderedDb = TAFFY(orderedData)
  debugger;
  var d = orderedDb().start(startAt).limit(100).get()
  let count = orderedDb().count()



  console.log('data.length', d.length)
  console.log('subcatregex', filterBySub)

  console.log('search', filterBySearch)
  console.log('marka', marka)
  console.log('startAt', startAt)
  console.log('count', count)
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
require('dotenv').config()
var TAFFY = require('taffy');


// Create a new database a single object (first record)
const data = require('../_files/kadin/data.json')

module.exports = (req, res) => {
  const { subcatregex, categoryregex, page, marka, search } = req.query
  const start = parseInt(page)
  var products = TAFFY(data);
  const filterBySub = subcatregex === '' ? {} : { title: { regex: new RegExp(subcatregex, 'i') } }

  const filterByCat = categoryregex === '' ? {} : { title: { regex: new RegExp(categoryregex, 'i') } }


  const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(search, 'i') } }
  const filterByMarka = marka === '' ? {} : { marka }
  debugger;
  //  var d = products().filter(filterByMarka).filter(filterBySearch).filter(filterBySub).filter(filterByCat).order("itemOrder asec").start(start).limit(100).get()
  var d = products().filter(filterByMarka).filter(filterBySearch).filter(filterBySub).filter(filterByCat).order("itemOrder asec").start(start).limit(100).get()
  let count = products().filter(filterByMarka).filter(filterBySearch).filter(filterBySub).filter(filterByCat).count()

  console.log('data.length', d.length)
  console.log('subcatregex', filterBySub)
  console.log('categoryregex', filterByCat)
  console.log('search', filterBySearch)
  console.log('marka', marka)
  console.log('page', page)
  debugger;
  res.status(200).json({ data: d,count })
}



  // for (let f in filterBySub) {
    //     const current = filterBySub[f]
    //     if (current === 'null') {
    //         debugger;
    //         delete filterBySub[f]
    //     }
    // }
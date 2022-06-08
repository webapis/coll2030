require('dotenv').config()
var TAFFY = require('taffy');


// Create a new database a single object (first record)
const data = require('../_files/kadin/data.json')
var products = TAFFY(data);
module.exports = (req, res) => {
    const { subcatregex, categoryregex, page, marka, search } = req.query
    const start = parseInt(page)
    const filterBySub = subcatregex === '' ? {} : { title: { regex: new RegExp(subcatregex, 'i') } }
    // for (let f in filterBySub) {
    //     const current = filterBySub[f]
    //     if (current === 'null') {
    //         debugger;
    //         delete filterBySub[f]
    //     }
    // }
    const filterByCat = categoryregex === '' ? {} : { title: { regex: new RegExp(categoryregex, 'i') } }
    // for (let f in filterByCat) {
    //     const current = filterByCat[f]
    //     if (current === 'null') {
    //         debugger;
    //         delete filterByCat[f]
    //     }
    // }

    const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(search, 'i') } }
    // for (let f in filterByCat) {
    //     const current = filterBySearch[f]
    //     if (current === 'null') {
    //         debugger;
    //         delete filterBySearch[f]
    //     }
    // }
    debugger;
   var data = products().order("itemOrder asec").filter(filterBySearch).filter(filterBySub).filter(filterByCat).start(start).limit(100).get()
  //  var data = products().order("itemOrder asec").filter(filterBySearch).start(start).limit(100).get()
    debugger;
    res.status(200).json({ data })
}

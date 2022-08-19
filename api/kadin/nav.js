require('dotenv').config()
var TAFFY = require('taffy');


const data = require('../_files/nav/nav-keywords.json')
module.exports = (req, res) => {
  const { subcategory, navindex } = req.query

  var navkeywords = TAFFY(data);
debugger

console.log('navindex',navindex)
//const all= navkeywords().get()
debugger
  const {keywords}= navkeywords().filter({index:navindex}).get()[0]
debugger


  res.status(200).json(keywords)
}


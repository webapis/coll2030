require('dotenv').config()
var TAFFY = require('taffy');


const data = require('../_files/nav/1-keywords.json')
module.exports = (req, res) => {
  const { navindex } = req.query

  var navkeywords = TAFFY(data);
debugger

console.log('navindex',navindex)

debugger
  const {keywords,fn}= navkeywords().filter({index:navindex}).get()[0]
debugger


  res.status(200).json({keywords,fn})
}


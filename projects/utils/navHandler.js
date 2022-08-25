require('dotenv').config()
var TAFFY = require('taffy');

const path = require('path');

function navHandler({ req, res, project, subcategory, keyOrder }) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { navindex } = req.query
    const data = require(path.join(process.cwd(), `api/_files/${subcategory}/nav/${keyOrder}-keywords.json`))
    var navkeywords = TAFFY(data);
    debugger

    console.log('navindex', navindex)

    debugger
    const { keywords, fn } = navkeywords().filter({ index: navindex }).get()[0]
    debugger
    res.status(200).json({ keywords, fn })
}

module.exports = { navHandler }
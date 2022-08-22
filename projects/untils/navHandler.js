require('dotenv').config()
var TAFFY = require('taffy');



function navHandler({ req, res, project, subcateogry, keyOrder }) {
    const { navindex } = req.query
    const data = require(`./${project}/api/_files/${subcateogry}/nav/${keyOrder}-keywords.json`)
    var navkeywords = TAFFY(data);
    debugger

    console.log('navindex', navindex)

    debugger
    const { keywords, fn } = navkeywords().filter({ index: navindex }).get()[0]
    debugger


    res.status(200).json({ keywords, fn })
}

module.exports = { navHandler }
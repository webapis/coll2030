var TAFFY = require('taffy');

const path = require('path');
function commonNavHandler({subcategory,keyOrder,navindex}) {

    const data = require(`../_files/key/${subcategory}/${keyOrder}-keywords.json`)
    var navkeywords = TAFFY(data);
    debugger

    console.log('navindex', navindex)

    debugger
    const { keywords, fn } = navkeywords().filter({ index: navindex }).get()[0]
    return { keywords }

}

module.exports = { commonNavHandler }
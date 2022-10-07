var TAFFY = require('taffy');

const path = require('path');
function commonNavHandler({subcategory,keyOrder,navindex}) {
debugger
    const data = require( path.join(process.cwd(),`api/_files/key/${subcategory}/${keyOrder}-keywords.json`))
    var navkeywords = TAFFY(data);


    console.log('navindex', navindex)

 debugger
    const { k } = navkeywords().filter({ i: navindex }).get()[0]
    debugger
    return { keywords:k }

}

module.exports = { commonNavHandler }
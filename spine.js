require('dotenv').config()
var TAFFY = require('taffy');


// Create a new database a single object (first record)
const data = require('./api/_files/kadin/data.json')
debugger;
var products = TAFFY(data);

    const subcategory=new RegExp('V Yaka.*Elbise','i');
    const marka ='defacto'

    const start = parseInt()
    const filter = { subcategory:{regex:new RegExp(subcategory,'')}, marka }
    for (let f in filter) {
        const current = filter[f]
        if (current === 'null') {
            debugger;
            delete filter[f]
        }
    }
    debugger;
    var d = products([{title:{regex:subcategory}}]).get();

    debugger;
 


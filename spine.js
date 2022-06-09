require('dotenv').config()
var TAFFY = require('taffy');


// Create a new database a single object (first record)
const data = require('./api/_files/kadin/data.json')
debugger;
var products = TAFFY(data);

    const text='Çiçek'

    debugger;
    var d = products([{title:{like:text}}]).get();

    debugger;
 


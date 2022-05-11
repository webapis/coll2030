require('dotenv').config()
 var TAFFY = require( 'taffy' );
debugger;
const { readFileSync } = require('fs')
const { join } = require('path')
// Create a new database a single object (first record)

const data =require('./_files/collection2023.json')
debugger;
var products = TAFFY(data);
module.exports =   (req, res)=> {
    var item1 = products().get()
debugger;
    res.status(200).json({items: item1})


}

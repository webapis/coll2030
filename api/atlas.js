require('dotenv').config()
 var TAFFY = require( 'taffy' );
debugger;

// Create a new database a single object (first record)

const data =require('./_files/collection2023.json')
debugger;
var products = TAFFY(data);
module.exports =   (req, res)=> {
    var data = products().limit(100).get()
debugger;
    res.status(200).json({data})


}

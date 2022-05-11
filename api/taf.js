require('dotenv').config()
 var TAFFY = require( 'taffy' );
debugger;

// Create a new database a single object (first record)

var products = TAFFY([{
    "item":1,
    "name":"Blue Ray Player",
    "price":99.99
}, {
    "item":2,
    name:"3D TV",
    price:1799.99
}]);
module.exports =   (req, res)=> {
    var item1 = products({item:1}).get()
debugger;
    res.status(200).json({items: item1})


}

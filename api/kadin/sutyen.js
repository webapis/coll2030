require('dotenv').config()
        var TAFFY = require( 'taffy' );

       
       // Create a new database a single object (first record)
       
       const data =require('../_files/kadin/sutyen.json')
     
       var products = TAFFY(data);
       module.exports =   (req, res)=> {
           var data = products().limit(100).get()
  
           res.status(200).json({data})
       
       
       }
       
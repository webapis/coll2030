require('dotenv').config()
        var TAFFY = require( 'taffy' );

       
       // Create a new database a single object (first record)
       
       const data =require('../_files/kadin/data.json')
     
       var products = TAFFY(data);
       module.exports =   (req, res)=> {
           const {subcategory}=req.query
           debugger;
           var data = products().filter({subcategory}).order("itemOrder").limit(100).get()
      
        debugger;
           res.status(200).json({data})
       
       
       }
       
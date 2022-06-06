require('dotenv').config()
        var TAFFY = require( 'taffy' );

       
       // Create a new database a single object (first record)
       const data =require('../_files/kadin/data.json')
       var products = TAFFY(data);
       module.exports =   (req, res)=> {
           const {subcategory,page,marka}=req.query
           const start =parseInt(page)
           const filter ={subcategory, marka}
           for(let f in filter){
            const current =filter[f]
            if(current==='null'){
                debugger;
                delete filter[f]
            }
           }
           debugger;
           var data = products().order("itemOrder asec").filter(filter).start(start).limit(100).get()
        debugger;
           res.status(200).json({data})
       }
       
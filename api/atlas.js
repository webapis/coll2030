require('dotenv').config()
const { MongoClient } = require('mongodb');

const uri = process.env.LOCAL==='TRUE' ? process.env.mongodb_localUrl: process.env.mongodb_url;
debugger;


export default  async (req, res)=> {
    debugger;
    const { gender, subcategory, page, category } = req.query
      const query = { subcategory:'pantolon', category: 'alt-giyim', gender: 'kadın' }
    debugger;
  //  const query = { subcategory: subcategory !== 'null' ? subcategory : undefined, category: category !== 'null' ? category : undefined, gender: gender !== 'null' ? gender : undefined }
debugger;
for(let item in query){
    let current =query[item]
    if(current===undefined){

        delete query[item]
    }

}

debugger;
    const skip = 0
 
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("ecom").collection("collection2023");
    const cursor = await collection.find(query).sort({"itemOrder":1}).skip(skip).limit(70)

    const data = await cursor.toArray()
debugger;
    clnt.close()
    debugger;

    res.status(200).json({data})


}




var through = require("through2");
var fs = require("fs");
var jsonArrayStreams = require("json-array-streams");
const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

async function importData() {


    return new Promise(async(resolve, reject) => {
        const clnt = await client.connect()
        const collection = clnt.db("streamToMongoDB").collection("category-nav");
        const stream = fs.createReadStream("./api/_files/kadin/data.json")
        //const collectionData = clnt.db("streamToMongoDB").collection("data");
       // const count = await collectionData.countDocuments()
        const data = fs.readFileSync("./api/_files/kadin/data.json", { encoding: 'utf-8' })
        const dataObjArr = JSON.parse(data).length
        console.log('dataObjArr',dataObjArr)
      
        let exportCount = 0
        stream.pipe(jsonArrayStreams.parse())
            .pipe(through.obj(async function (object, enc, cb) {
                const { category, subcategory
                } = object
                await collection.updateOne({}, { $inc: { [`nav.total`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.tree.${category}.total`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.tree.${category}.subcategories.${subcategory}`]: 1 } }, { upsert: true })
                ++ exportCount
            //    console.log("exportCount and count-1", exportCount, dataObjArr)
                if (exportCount === (dataObjArr)) {
                  
                    return resolve(true)
                }
                cb();
            }))
            
            stream.on('error', (error) => {

            return reject(error)
        })
    })

}

async function extractNavTree() {

    const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("streamToMongoDB").collection("category-nav");
    const data = await collection.aggregate([{ $project: { _id: 0, marka: 0 } }]).toArray()
    if(  fs.existsSync('./src/components/categoryMenu/category-nav.json')){
        fs.unlinkSync('./src/components/categoryMenu/category-nav.json')
    }
    fs.appendFileSync(`./src/components/categoryMenu/category-nav.json`, JSON.stringify(data))
    debugger;

}

async function generateCategoryNav() {
    try {
        console.log('CATEGORY NAV GEN STARTED....')
        await importData()
        await extractNavTree()
        console.log('CATEGORY NAV GEN COMPLETE....')
        return 
    } catch (error) {
        console.log(' generateCategoryNav error',error)
    }

}
module.exports = { generateCategoryNav }
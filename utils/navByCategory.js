

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
        const collectionData = clnt.db("streamToMongoDB").collection("data");
        const count = await collectionData.countDocuments()
        let exportCount = 0
        stream.pipe(jsonArrayStreams.parse())
            .pipe(through.obj(async function (object, enc, cb) {
                const { category, subcategory
                } = object
                await collection.updateOne({}, { $inc: { [`nav.total`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.tree.${category}.total`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.tree.${category}.subcategories.${subcategory}`]: 1 } }, { upsert: true })
                ++ exportCount
                if (exportCount === (count-1)) {
                  
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
    if(  fs.existsSync('./src/category-nav.json')){
        fs.unlinkSync('./src/category-nav.json')
    }
    fs.appendFileSync(`./src/category-nav.json`, JSON.stringify(data))
    debugger;

}

async function generateCategoryNav() {
    console.log('CATEGORY NAV GEN STARTED....')
    await importData()
    await extractNavTree()
    console.log('CATEGORY NAV GEN COMPLETE....')
}
module.exports = { generateCategoryNav }
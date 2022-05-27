

var through = require("through2");
var fs = require("fs");
var jsonArrayStreams = require("json-array-streams");
const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

async function importData() {


    return new Promise(async (resolve, reject) => {
        const clnt = await client.connect()
        const collection = clnt.db("streamToMongoDB").collection("marka-nav");
        const collectionData = clnt.db("streamToMongoDB").collection("data");
        const count = await collectionData.countDocuments()
        let exportCount = 0
  
        const stream = fs.createReadStream("./api/_files/kadin/data.json")
   
        stream.pipe(jsonArrayStreams.parse())
            .pipe(through.obj(async function (object, enc, cb) {
                const { marka, category, subcategory
                } = object

                await collection.updateOne({}, { $inc: { [`nav.total`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.tree.${marka}.total`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.tree.${marka}.${category}.total`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.tree.${marka}.${category}.subcategories.${subcategory}`]: 1 } }, { upsert: true })
               ++ exportCount
                if (exportCount === (count-1)) {
                    debugger;
                    return resolve(true)
                } else{
                    debugger;
                }

                cb();
            }))
             stream.on('error', (error) => {
                debugger;
                return reject(error)
            })
    })

}

async function extractNavTree() {

    const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("streamToMongoDB").collection("marka-nav");
    const data = await collection.aggregate([{ $project: { _id: 0, marka: 0 } }]).toArray()
    if (fs.existsSync('./src/marka-nav.json')) {
        fs.unlinkSync('./src/marka-nav.json')
    }


    fs.appendFileSync(`./src/marka-nav.json`, JSON.stringify(data))
    debugger;

}

async function generateMarkaNav() {
    console.log('MARKA NAV GEN STARTED....')
    debugger;
    await importData()
    debugger;
    await extractNavTree()
    console.log('MARKA NAV GEN COMPLETE....')
}
module.exports = { generateMarkaNav }
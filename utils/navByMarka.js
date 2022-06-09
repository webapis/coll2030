

var through = require("through2");
var fs = require("fs");
var jsonArrayStreams = require("json-array-streams");
const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });
async function mongoClient() {
    const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

    const clnt = await client.connect()
    const collection = clnt.db("streamToMongoDB").collection("marka-nav");

    return collection
}
async function imporOldtData() {


    return new Promise(async (resolve, reject) => {
        const clnt = await client.connect()
        const collection = clnt.db("streamToMongoDB").collection("marka-nav");
        await collection.deleteMany({})
        let exportCount = 0
        const data = fs.readFileSync("./api/_files/kadin/data.json", { encoding: 'utf-8' })
        const dataObjArr = JSON.parse(data).length
        console.log('dataObjArr', dataObjArr)
        const stream = fs.createReadStream("./api/_files/kadin/data.json")

        stream.pipe(jsonArrayStreams.parse())
            .pipe(through.obj(async function (object, enc, cb) {
                const { marka, category, subcategory
                } = object

                await collection.updateOne({}, { $inc: { [`nav.totalByMarka`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.markas.${marka}.totalByCatory`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.totalBySubcategory`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.subcategories.${subcategory}`]: 1 } }, { upsert: true })
                ++exportCount

                //  console.log("exportCount and count-1", exportCount, dataObjArr)
                if (exportCount === (dataObjArr)) {
                    debugger;
                    return resolve(true)
                } else {
                    debugger;
                }

                cb();
            }))
        stream.on('error', (error) => {
            debugger;
            console.log('Error', error)
            return reject(error)
        })
    })

}
async function importData() {

    try {
        console.log('IMPORTING DATA STARTED....')
        const files = fs.readdirSync('data-nav')
        const collection = await mongoClient()
        await collection.deleteMany({})
        for (let file of files) {
            console.log('file....', file)
            const data = fs.readFileSync(`data-nav/${file}`, { encoding: 'utf8' })
            console.log('file....data....', file, data.length)
            const dataObjectArr = JSON.parse(data)
            console.log('dataObjectArr.length', dataObjectArr.length)
            for (let object of dataObjectArr) {
                const { category, subcategory, regex,marka
                } = object
                await collection.updateOne({}, { $inc: { [`nav.totalByMarka`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.markas.${marka}.totalByCatory`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.totalBySubcategory`]: 1 } }, { upsert: true })
                await collection.updateOne({}, { $set: { [`nav.markas.${marka}.categories.${category}.subcategories.${subcategory}.regex`]: regex } }, { upsert: true })
                await collection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.subcategories.${subcategory}.count`]: 1 } }, { upsert: true })
            }
        }
        console.log('IMPORTING DATA COMPLETE....')
    } catch (error) {


        console.log('error importing data', error)
    }


}
async function extractNavTree() {

    const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("streamToMongoDB").collection("marka-nav");
    const data = await collection.aggregate([{ $project: { _id: 0, marka: 0 } }]).toArray()
    if (fs.existsSync('./src/components/markaMenu/marka-nav.json')) {
        fs.unlinkSync('./src/components/markaMenu/marka-nav.json')
    }


    fs.appendFileSync(`./src/components/markaMenu/marka-nav.json`, JSON.stringify(data))
    debugger;

}

async function generateMarkaNav() {


    try {
        console.log('MARKA NAV GEN STARTED....')
        debugger;
        await importData()
        debugger;
        await extractNavTree()
        console.log('MARKA NAV GEN COMPLETE....')
        return
    } catch (error) {
        console.log('generateMarkaNav error', error)
    }
}
module.exports = { generateMarkaNav }
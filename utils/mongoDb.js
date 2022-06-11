

require('dotenv').config()

const { MongoClient } = require('mongodb')
//const stream = require('stream')
const fs = require('fs')
const path = require('path')

const makeDir = require('make-dir');
//var through = require("through2");
//var jsonArrayStreams = require("json-array-streams");


async function mongoClient({ collectionName }) {
    const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

    const clnt = await client.connect()
    const collection = clnt.db("streamToMongoDB").collection(collectionName);

    return collection
}
async function importData({ collectionName, folder }) {

    try {
        console.log('IMPORTING DATA STARTED....')
        const files = fs.readdirSync(folder)
        const collection = await mongoClient({ collectionName })
        await collection.deleteMany({})
        let totaldata =0
        for (let file of files) {
      
            const data = fs.readFileSync(`${folder}/${file}`, { encoding: 'utf8' })
           
            const dataObjectArr = JSON.parse(data)
            totaldata=totaldata+dataObjectArr.length
            await collection.insertMany(dataObjectArr)
        }
        console.log('IMPORTING DATA COMPLETE....',totaldata)
    } catch (error) {
        console.log('error importing data', error)
    }
}

async function exportData({ exportPath, collectionName, aggegation }) {
    console.log('EXPORTING DATA STARTED....')
    const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("streamToMongoDB").collection(collectionName);
    const data = await collection.aggregate(aggegation).toArray()
    const dirname = path.dirname(exportPath)
    debugger;
    await makeDir(dirname)
    if (fs.existsSync(exportPath)) {
        fs.unlinkSync(exportPath)
    }
    fs.appendFileSync(exportPath, JSON.stringify(data))
    console.log('EXPORTING DATA COMPLETE....',data.length)
 
}

async function extractNavData({collection,exportPath}) {
    const dirname = path.dirname(exportPath)
    debugger;
    await makeDir(dirname)

    const data = await collection.aggregate([{ $project: { _id: 0, marka: 0 } }]).toArray()
    if (fs.existsSync(exportPath)) {
        fs.unlinkSync(exportPath)
    }

    fs.appendFileSync(exportPath, JSON.stringify(data))
    debugger;

}
module.exports = { importData, exportData,mongoClient,extractNavData }



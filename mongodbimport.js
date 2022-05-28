require('dotenv').config()

const { MongoClient } = require('mongodb')
const stream = require('stream')
const fs = require('fs')

var through = require("through2");
var jsonArrayStreams = require("json-array-streams");


async function mongoClient() {
  const client = new MongoClient('mongodb://localhost:27017/streamToMongoDB', { useNewUrlParser: true, useUnifiedTopology: true });

  const clnt = await client.connect()
  const collection = clnt.db("streamToMongoDB").collection("data");

  return collection
}
async function importOldData() {


  return new Promise(async (resolve, reject) => {
    const collection = await mongoClient()
    const stream = fs.createReadStream("./api/_files/kadin/data.json")
    const data = fs.readFileSync("./api/_files/kadin/data.json", { encoding: 'utf-8' })
    const jsonData = JSON.parse(data)
    let countImportedData = 1
    stream.pipe(jsonArrayStreams.parse())
      .pipe(through.obj(async function (object, enc, cb) {
        const { imageUrl
        } = object
        await collection.updateOne({ "_id": imageUrl }, { $set: { ...object, updated: false } }, { upsert: true })
        ++countImportedData
        if (countImportedData === jsonData.length) {
          return resolve(true)
        } else {
          debugger;
        }
        cb();
      }))

    stream.on('error', (error) => {

      return reject(error)
    })
  })



}




async function importNewData(newCollectedData) {

  let marka = ''
  const collection = await mongoClient()
  for (let obj in newCollectedData) {

    const object = newCollectedData[obj]
    const { imageUrl } = object
    marka = object.marka
    await collection.updateOne({ _id: imageUrl }, { $set: { ...object, updated: true } }, { upsert: true })
  }

  const deletedNotUpdate = await collection.deleteMany({ "updated": false, marka })
  console.log('deletedNotUpdate...', deletedNotUpdate)

}

async function exportData() {

  console.log('EXPORTING DATA STARTED......')
  const collection = await mongoClient()

  const cursor = await collection.aggregate(orderAggr, { allowDiskUse: true })
  const cursor2 = await collection.aggregate(orderAggr, { allowDiskUse: true })
  if (fs.existsSync('./api/_files/kadin/data.json')) {
    fs.unlinkSync('./api/_files/kadin/data.json')

  }
  fs.appendFileSync(`./api/_files/kadin/data.json`, JSON.stringify([]))
  const writeStream = fs.createWriteStream('./api/_files/kadin/data.json')
  writeStream.write('[')
  const countdata = await cursor2.toArray()

  let parcedData = 0

  cursorAsStream = stream.Readable.from(cursor.map(async (entry) => {
    const { products, category, itemOrder, marka, subcategory } = entry
    const next = { ...products, category, itemOrder, marka, subcategory }

    ++parcedData
    if (parcedData === countdata.length) {
      return JSON.stringify(next) + '\n'
    }

    return JSON.stringify(next) + ',\n'

  }))
  cursorAsStream.pipe(writeStream);

  return new Promise((resolve, reject) => {

    writeStream.on('finish', () => {

      console.log('EXPORTING DATA COMPLETED......')
      fs.appendFileSync(`./api/_files/kadin/data.json`, ']')
      resolve(true)

    })
    writeStream.on('pipe', () => {

      console.log('data recieved')
    })
    writeStream.on('error', (error) => {

      console.log('export error', error)
      reject(error)
    })

  })


}

async function mergeNewData(newCollectedData) {

  if (fs.existsSync('./api/_files/kadin/data.json')) {
    await importOldData()
  }



  await importNewData(newCollectedData)

  await exportData()
}

module.exports = { mergeNewData }


const orderAggr = [
  {
    '$sort': {
      'timestamp': 1
    }
  }, {
    '$group': {
      '_id': {
        'imageUrl': '$imageUrl'
      },
      'title': {
        '$first': '$title'
      },
      'priceNew': {
        '$first': '$priceNew'
      },
      'imageUrl': {
        '$first': '$imageUrl'
      },
      'link': {
        '$first': '$link'
      },
      'timestamp': {
        '$first': '$timestamp'
      },
      'category': {
        '$first': '$category'
      },
      'marka': {
        '$first': '$marka'
      },
      'subcategory': {
        '$first': '$subcategory'
      }
    }
  }, {
    '$group': {
      '_id': {
        'marka': '$marka',
        'subcategory': '$subcategory'
      },
      'marka': {
        '$first': '$marka'
      },
      'subcategory': {
        '$first': '$subcategory'
      },
      'category': {
        '$first': '$category'
      },
      'products': {
        '$push': {
          'title': '$title',
          'priceNew': '$priceNew',
          'imageUrl': '$imageUrl',
          'link': '$link',
          'timestamp': '$timestamp'
        }
      }
    }
  }, {
    '$unwind': {
      'path': '$products',
      'includeArrayIndex': 'itemOrder',
      'preserveNullAndEmptyArrays': true
    }
  }
]









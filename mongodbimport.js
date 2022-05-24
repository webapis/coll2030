require('dotenv').config()

const { MongoClient } = require('mongodb')
const stream = require('stream')
const fs = require('fs')
async function importData() {


  const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
  const JSONStream = require('JSONStream');
  const fs = require('fs');

  // where the data will end up
  const outputDBConfig = { dbURL: 'mongodb://localhost:27017/streamToMongoDB', collection: 'data' };

  return new Promise((resolve, reject) => {
    // create the writable stream
    const writableStream = streamToMongoDB(outputDBConfig);
    writableStream.on('finish', () => {
      console.log('import data complete')
      resolve(true)
    })
    writableStream.on('error', (error) => {
      console.log('import data error')
      reject(error)
    })
    // create readable stream and consume it
    const readstream = fs.createReadStream('./api/_files/kadin/data.json')

    readstream.pipe(JSONStream.parse('*'))
      .pipe(writableStream);
    readstream.on('data', (data) => {

    })

  })



}

async function exportData() {
  debugger;
  console.log('EXPORTING DATA STARTED......')
  const uri = process.env.MONGODB_URL
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const clnt = await client.connect()
  const collection = clnt.db("streamToMongoDB").collection("data");
  const cursor = await collection.aggregate(orderAggr, { allowDiskUse: true })
  const cursor2 = await collection.aggregate(orderAggr, { allowDiskUse: true })
  const writeStream = fs.createWriteStream('./api/_files/kadin/data.json')
  writeStream.write('[')
  const countdata = await  cursor2.toArray()
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
    debugger;
    writeStream.on('finish', () => {
      debugger;
      console.log('EXPORTING DATA COMPLETED......')
      fs.appendFileSync(`./api/_files/kadin/data.json`, ']')
      resolve(true)

    })
    writeStream.on('pipe', () => {
      debugger;
      console.log('data recieved')
    })
    writeStream.on('error', (error) => {
      debugger;
      console.log('export error', error)
      reject(error)
    })

  })


}

async function generateNav() {
  console.log('NAVIGATION GENERATION STARTED......')
  debugger;
  const uri = process.env.MONGODB_URL
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const clnt = await client.connect()
  const collection = clnt.db("streamToMongoDB").collection("data");

  const cursor = await collection.aggregate(nav, { allowDiskUse: true })
  const cursor2 = await collection.aggregate(orderAggr, { allowDiskUse: true })
  const coll =await cursor2.toArray()
  const navs = await cursor.toArray()
  const navObj = { navs, total: coll.length }
  fs.unlinkSync('./src/nav.json')
  fs.appendFileSync(`./src/nav.json`, JSON.stringify(navObj))
  console.log('NAVIGATION GENERATION COMPLETED......')
  debugger;
}

module.exports = { importData, exportData, generateNav }


const nav = [
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
    }},
  {
    '$group': {
      '_id': {
        'subcategorycategory': '$subcategory'
      },
      'subcategory': {
        '$first': '$subcategory'
      },
      'category': {
        '$first': '$category'
      },
      'subCatTotal': {
        '$count': {}
      }
    }
  }, {
    '$group': {
      '_id': {
        'category': '$category'
      },
      'category': {
        '$first': '$category'
      },
      'categoryTotal': {
        '$sum': '$subCatTotal'
      },
      'subcategories': {
        '$push': {
          'subcategory': '$subcategory',
          'subCatTotal': '$subCatTotal'
        }
      }
    }
  }
]


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


const markaAgr=[
  {
    '$group': {
      '_id': {
        'marka': '$marka', 
        'category': '$category'
      }, 
      'marka': {
        '$first': '$marka'
      }, 
      'category': {
        '$first': '$category'
      }, 
      'products': {
        '$push': {
          'category': '$category', 
          'subcategory': '$subcategory'
        }
      }
    }
  }, {
    '$sort': {
      'marka': 1
    }
  }, {
    '$group': {
      '_id': '$marka', 
      'tree': {
        '$push': {
          'category': '$category', 
          'sub': {
            '$filter': {
              'input': '$products', 
              'as': 'product', 
              'cond': {
                '$eq': [
                  '$$product.category', '$category'
                ]
              }
            }
          }
        }
      }
    }
  }
]


/*
const orderAggr = [
  {
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
*/
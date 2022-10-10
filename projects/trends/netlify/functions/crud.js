
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URL

exports.handler = async function (event, context) {


  if (event.httpMethod === 'OPTIONS') {

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    // To enable CORS
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: 'This was not a POST request!'
    };

  }
  else if (event.httpMethod === 'GET') {

    const { type, _id } = event.queryStringParameters

    const client = new MongoClient(uri, { useUnifiedTopology: true });
    const db = client.db("biraradamoda");

    let collection = db.collection('keywords');
    let query = type === 'all' ? {} : { _id }
    let data = await collection.find(query).toArray()


    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
      },
      body: JSON.stringify({ data })
    }

  }
  else if (event.httpMethod === 'POST') {
    debugger
    try {

      const { body } = event
      const objData = JSON.parse(body)
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      const db = client.db("biraradamoda");

      let collection = db.collection('keywords');
      let count = await collection.countDocuments()
      let { insertedId } = await collection.insertOne({ ...objData, index: count + 1 })

      debugger
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        },
        body: JSON.stringify({ _id: insertedId })
      }
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        },
        body: "Server side error"
      }
    }


  }
  else if (event.httpMethod === 'DELETE') {
    debugger
    const { start, search, selectedNavIndex } = event.queryStringParameters

    debugger


    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
      },
      body: JSON.stringify({ data: d, count })
    }

  }

  else if (event.httpMethod === 'PUT') {

    try {
      debugger
      const { body } = event
      const objData = JSON.parse(body)
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      const db = client.db("biraradamoda");
      const id = objData._id
      delete objData._id
      let collection = db.collection('keywords');
      debugger
      let {modifiedCount} = await collection.updateOne({ _id: ObjectId(id) }, { $set: objData })

      debugger
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        },
        body: JSON.stringify({
          modifiedCount
        })
      }
    } catch (error) {

      debugger
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        },
        body: "Server side error"
      }
    }

  }
  else {

    return {
      statusCode: 500,
      body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE/OPTIONS'
    };
  }

}

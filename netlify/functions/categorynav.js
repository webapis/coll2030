require('dotenv').config()
const { MongoClient } = require('mongodb');

//const uri = process.env.DEPLOY_URL === 'http://localhost:8888' ? process.env.mongodb_localUrl : process.env.mongodb_url;
const uri = process.env.mongodb_url;
console.log('process.env', process.env)
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async function (event, context) {
    const { gender } = event.queryStringParameters

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const clnt = await client.connect()
    const collection = clnt.db("ecom").collection(`${gender}-nav`);
    const cursor = await collection.find()

    const data = await cursor.toArray()


    clnt.close()
 
    return {
        statusCode: 200, headers,
        body: JSON.stringify({ data })
    }

}


require('dotenv').config()
var TAFFY = require('taffy');

const path = require('path');

function navHandler({ event, project, subcategory, keyOrder }) {


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

    } else if (event.httpMethod === 'GET') {
        const { navindex } = event.queryStringParameters
        const data = require(`./api/_files/${subcategory}/nav/${keyOrder}-keywords.json`)
        var navkeywords = TAFFY(data);
        debugger

        console.log('navindex', navindex)

        debugger
        const { keywords, fn } = navkeywords().filter({ index: navindex }).get()[0]
        debugger
        return {
            statusCode: 200,
            body: JSON.stringify({ keywords, fn })
        }
    } else {

        return {
            statusCode: 500,
            body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE/OPTIONS'
        };
    }

}

module.exports = { navHandler }
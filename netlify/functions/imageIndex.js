var TAFFY = require('taffy');

const path = require('path');

exports.handler = async function imageIndex(event, context) {
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

        const data = require( path.join(process.cwd(),`api/_files/image-indexes/image-indexes.json`))

        var navkeywords = TAFFY(data);
    
    
        console.log('navindex', navindex)
    
     debugger
        const {imageIndexes}  = navkeywords().filter({ index: navindex }).get()[0]
        debugger
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
            },
            body: JSON.stringify(imageIndexes )
        }
    } else {

        return {
            statusCode: 500,
            body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE/OPTIONS'
        };
    }


}


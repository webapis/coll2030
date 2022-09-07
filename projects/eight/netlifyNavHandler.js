require('dotenv').config()

const {commonNavHandler}=require('./commonNavHandler')
function netlifyNavHandler({ event, subcategory, keyOrder }) {


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

        const { keywords } = commonNavHandler({subcategory,keyOrder,navindex})
        debugger
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
            },
            body: JSON.stringify({ keywords })
        }
    } else {

        return {
            statusCode: 500,
            body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE/OPTIONS'
        };
    }

}

module.exports = { netlifyNavHandler }
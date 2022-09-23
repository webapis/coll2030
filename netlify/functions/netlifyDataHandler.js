require('dotenv').config()
const { commonDataHandler } = require(`${process.cwd()}/api/utils/commonDataHandler`)
function netlifyDataHandler({ event, project, subcategory }) {
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
    debugger
    const { start, search, selectedNavIndex } = event.queryStringParameters
    const { d, count } = commonDataHandler({ start, search, selectedNavIndex, subcategory })
    debugger


    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow from anywhere 
      },
      body: JSON.stringify({ data: d, count })
    }

  } else {

    return {
      statusCode: 500,
      body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE/OPTIONS'
    };
  }

}



module.exports = { netlifyDataHandler }
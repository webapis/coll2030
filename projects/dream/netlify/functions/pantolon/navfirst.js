require('dotenv').config()

const { navHandler } = require('../../../utils/navHandler')
exports.handler = async function (event, context)  {

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
 // navHandler({ req, res, subcategory: 'pantolon', project: 'dream', keyOrder: '0' })
}


require('dotenv').config()

//const { dataHandler } = require('../../../utils/dataHandler')
exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World" }),
      };
 // dataHandler({ req, res, project: 'dream', subcategory: 'elbise' })

}

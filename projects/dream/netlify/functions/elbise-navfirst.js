require('dotenv').config()

const { navHandler } = require('../../utils/navHandler')
exports.handler = async function (event, context) {


return await  navHandler({ event, subcategory: 'elbise', project: 'dream', keyOrder: '0' })
}


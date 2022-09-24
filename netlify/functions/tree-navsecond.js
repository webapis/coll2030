require('dotenv').config()

const { netlifyNavHandler } = require('./netlifyNavHandler')
exports.handler = async function (event, context) {


return await  netlifyNavHandler({ event, subcategory: 'three', project: 'dream', keyOrder: '1' })
}


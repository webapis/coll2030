require('dotenv').config()

const { netlifyNavHandler } = require('./netlifyNavHandler')
exports.handler = async function (event, context) {


return await  netlifyNavHandler({ event, subcategory: 'eighteen', keyOrder: '1' })
}


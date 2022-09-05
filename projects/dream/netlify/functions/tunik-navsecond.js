require('dotenv').config()

const { netlifyNavHandler } = require('../../netlifyNavHandler')
exports.handler = async function (event, context) {


return await  netlifyNavHandler({ event, subcategory: 'tunik', project: 'dream', keyOrder: '1' })
}


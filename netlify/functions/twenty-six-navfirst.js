
const path =require('path')

const { netlifyNavHandler } = require( './netlifyNavHandler')
exports.handler = async function (event, context) {


return await  netlifyNavHandler({ event, subcategory: 'twenty-six', keyOrder: '0' })
}


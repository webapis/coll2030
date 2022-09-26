
const path =require('path')

const { netlifyNavHandler } = require( './netlifyNavHandler')
exports.handler = async function (event, context) {


return await  netlifyNavHandler({ event, subcategory: 'eighteen', keyOrder: '0' })
}


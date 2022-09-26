
const { netlifyDataHandler } = require('./netlifyDataHandler')
exports.handler = async function (event, context) {


return await netlifyDataHandler({ event,  subcategory: 'five' })

}

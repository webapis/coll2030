
const { navHandler } = require('../../navHandler')
exports.handler = async function (event, context) {


return await  navHandler({ event, subcategory: 'pantolon', project: 'dream', keyOrder: '1' })
}


const { navHandler } = require('../../utils/navHandler')
exports.handler = async function (event, context) {


return await  navHandler({ event, subcategory: 'pantolon', project: 'dream', keyOrder: '0' })
}

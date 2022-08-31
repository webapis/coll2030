
const { netlifyNavHandler } = require('../../netlifyNavHandler')
exports.handler = async function (event, context) {


return await  netlifyNavHandler({ event, subcategory: 'pantolon', project: 'dream', keyOrder: '0' })
}


const { dataHandler } = require('../../dataHandler')
exports.handler = async function (event, context) {


return await dataHandler({ event, project: 'dream', subcategory: 'elbise' })

}

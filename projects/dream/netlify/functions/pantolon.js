
const { dataHandler } = require('../../utils/dataHandler')
exports.handler = async function (event, context) {


return await dataHandler({ event, project: 'dream', subcategory: 'pantolon' })

}

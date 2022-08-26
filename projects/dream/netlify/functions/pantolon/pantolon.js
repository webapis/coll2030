
const { dataHandler } = require('../../../utils/dataHandler')
exports.handler =  function (event, context) {


return { ...dataHandler({ event, project: 'dream', subcategory: 'pantolon' })}

}

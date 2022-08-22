require('dotenv').config()

const { dataHandler } = require('../../../../untils/dataHandler')
module.exports = (req, res) => {

  dataHandler({ req, res, project: 'dream', subcategory: 'elbise' })

}

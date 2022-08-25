require('dotenv').config()

const { dataHandler } = require('../../../utils/dataHandler')
module.exports = (req, res) => {

    dataHandler({ req, res, project: 'dream', subcategory: 'pantolon' })

}
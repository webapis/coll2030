require('dotenv').config()

const { navHandler } = require('../../../utils/navHandler')
module.exports = (req, res) => {


  navHandler({ req, res, subcategory: 'pantolon', project: 'dream', keyOrder: '1' })
}


require('dotenv').config()

const { navHandler } = require('../../../../untils/navHandler')
module.exports = (req, res) => {


  navHandler({ req, res, subcategory: 'pantolon', project: 'dream', keyOrder: '0' })
}

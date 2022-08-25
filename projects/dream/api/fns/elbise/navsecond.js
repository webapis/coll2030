require('dotenv').config()

const { navHandler } = require('../../../../utils/navHandler')
module.exports = (req, res) => {


  navHandler({ req, res, subcategory: 'elbise', project: 'dream', keyOrder: '1' })
}


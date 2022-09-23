require('dotenv').config()

const { vercelNavHandler } = require('../utils/vercelNavHandler')
module.exports = (req, res) => {


  vercelNavHandler({ req, res, subcategory: 'elbise', keyOrder: '0' })
}


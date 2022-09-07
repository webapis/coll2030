require('dotenv').config()

const { vercelNavHandler } = require('../../vercelNavHandler')
module.exports = (req, res) => {


  vercelNavHandler({ req, res, subcategory: 'etek', keyOrder: '0' })
}


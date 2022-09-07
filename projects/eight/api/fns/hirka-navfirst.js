require('dotenv').config()

const { vercelNavHandler } = require('../../vercelNavHandler')
module.exports = (req, res) => {


  vercelNavHandler({ req, res, subcategory: 'hırka', keyOrder: '0' })
}


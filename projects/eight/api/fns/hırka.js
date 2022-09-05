require('dotenv').config()

const { vercelDataHandler } = require('../../vercelDataHandler')
module.exports = (req, res) => {

  vercelDataHandler({ req, res, subcategory: 'hırka' })

}
//
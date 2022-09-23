require('dotenv').config()

const { vercelDataHandler } = require('../utils/vercelDataHandler')
module.exports = (req, res) => {

  vercelDataHandler({ req, res, project: 'dream', subcategory: 'elbise' })

}
//
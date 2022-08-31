require('dotenv').config()

const { vercelNavHandler } = require('../../vercelNavHandler')
module.exports = (req, res) => {


  vercelNavHandler({ req, res, subcategory: 'elbise', keyOrder: '1' })
}

//
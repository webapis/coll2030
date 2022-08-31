
const { commonNavHandler } = require('./commonNavHandler')
function vercelNavHandler({ req, res, subcategory, keyOrder }) {
    const { navindex } = req.query
    const { keywords } = commonNavHandler({ subcategory, keyOrder, navindex })
    res.status(200).json({ keywords })
}

module.exports = { vercelNavHandler }
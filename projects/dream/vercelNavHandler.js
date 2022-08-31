
const { commonNavHandler } = require('./commonNavHandler')
function vercelNavHandler({ req, res, subcategory, keyOrder }) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const { navindex } = req.query
    const { keywords } = commonNavHandler({ subcategory, keyOrder, navindex })
    res.status(200).json({ keywords })
}

module.exports = { vercelNavHandler }
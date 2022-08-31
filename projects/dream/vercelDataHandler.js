const { commonDataHandler } = require('./commonDataHandler')
function vercelDataHandler({ req, res, subcategory }) {
    const { subcategory, start, search, selectedNavIndex } = req.query
    const { d, count } = commonDataHandler({ start, search, selectedNavIndex, subcategory })
    res.status(200).json({ data: d, count })

}

module.exports = { vercelDataHandler }
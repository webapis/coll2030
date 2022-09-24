require('dotenv').config()


async function generateSubcategoryKeywords() {
    const fs = require('fs')
    const makeDir = require('make-dir');
    const { getSheetValues } = require('../google.sheet.js')
    const { getGoogleToken } = require('../google/google.oauth')


    const spreadsheetId = '1A4FWttdgPq2kaT2fr_Z0ke3ETfK8ndjiyEc7nvJ4xHk'
    const website = process.env.WEBSITE
    const google_access_token = await getGoogleToken()

    let categoryItems = []
    const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId, range: `${website}!A:D` })
    debugger
    for (let value of sheetData.values.filter((c, i) => i > 0)) {
        const subcategory = value[0]
        const exact = value[1]
        const exclude = value[2]
        const functionName = value[3]
        categoryItems.push({ subcategory, exact, exclude, functionName })
debugger
    }


    await makeDir(`subcategory-keywords/${website}`)

    if (fs.existsSync(`subcategory-keywords/${website}/keywords.json`)) {
        fs.unlinkSync(`subcategory-keywords/${website}/keywords.json`)
    }
    fs.appendFileSync(`subcategory-keywords/${website}/keywords.json`, JSON.stringify(categoryItems))



}

(async () => {

    await generateSubcategoryKeywords()

})()


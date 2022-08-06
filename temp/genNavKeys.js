


(async () => {
    const { getGoogleToken } = require('../google/google.oauth')
    const fs = require('fs')

    const makeDir = require('make-dir');
    const path = require('path')
    const google_access_token = await getGoogleToken()
    const spreadsheetId = '1GLN7_-mqagdV0yoQUIGjBqs4orP9StAGwqlJXYfKwQQ'
    const navkeywords = await generateNavKeys({ google_access_token, spreadsheetId, range: 'keys!A:B' })
   debugger
    await makeDir('nav-keys')
    if (fs.existsSync(`${process.cwd()}/nav-keys/nav-keywords.json`)) {
        fs.unlinkSync(`${process.cwd()}/nav-keys/nav-keywords.json`)
    }
    fs.appendFileSync(`${process.cwd()}/nav-keys/nav-keywords.json`, JSON.stringify(navkeywords))
    process.exit(0)

})()


async function generateNavKeys({ google_access_token, spreadsheetId, range }) {
    const { getSheetValues, appendSheetValues } = require('../google.sheet.js')
    const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId, range })
    let categoryItems = []
    for (let value of sheetData.values.filter((c, i) => i > 0)) {
        const keyword = value[0]
        const group = value[1]
        categoryItems.push({ keyword, group })

    }
    const groupByParentKey = categoryItems
    debugger;

    return groupByParentKey


}
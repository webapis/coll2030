


(async () => {
    const { getGoogleToken } = require('../google/google.oauth')

    const google_access_token = await getGoogleToken()
    const spreadsheetId = '1GLN7_-mqagdV0yoQUIGjBqs4orP9StAGwqlJXYfKwQQ'
    await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'one' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'two' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'three' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'four' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'five' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'six' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'seven' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'eight' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'nine' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'ten' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'eleven' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twelve' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'thirteen' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'fourteen' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'fifteen' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'sixteen' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'seventeen' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'eighteen' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'nineteen' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty-one' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty-two' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty-three' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty-four' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty-five' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty-six' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty-seven' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty-eight' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'twenty-nine' })
    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'thirty' })

    // await generateKeyword({ google_access_token, spreadsheetId, range: 'elbise!A:L', node: 'dream', subcategory: 'diger' })

    process.exit(0)

})()


async function generateKeyword({ google_access_token, spreadsheetId, range }) {
    const fs = require('fs')
    const makeDir = require('make-dir');

    const { getSheetValues, appendSheetValues } = require('../google.sheet.js')
    let categoryItems = []


    const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId, range })
    debugger
    for (let value of sheetData.values.filter((c, i) => i > 0)) {
        const keywords = value[0]

        const title = value[1]
        const exclude = value[2]
        const index = value[3]
        const keywordType = value[4]
        const groupName = value[5]
        const functionName = value[6]
        debugger
        categoryItems.push({ keywords, title, exclude, index, keywordType, groupName, functionName })

    }

    const data = categoryItems

    await makeDir(`api/_files/nav`)

    if (fs.existsSync(`api/_files/nav/keywords.json`)) {
        fs.unlinkSync(`api/_files/nav/keywords.json`)
    }
    fs.appendFileSync(`api/_files/nav/keywords.json`, JSON.stringify(data))


    if (fs.existsSync(`src/keywords.json`)) {
        fs.unlinkSync(`src/keywords.json`)
    }


    const reduced = data.reduce((prev, curr) => {

        return {
            ...prev, [curr.title]: { subcategory: curr.subcategory, category: curr.category, keywords: curr.keywords }
        }
    }, {})
    debugger
    fs.appendFileSync(`src/keywords.json`, JSON.stringify(reduced))


}



(async () => {
    const { getGoogleToken } = require('../google/google.oauth')
    const fs = require('fs')
    const { getSheetValues, appendSheetValues } = require('../google.sheet.js')
    const makeDir = require('make-dir');
    const path = require('path')



    const google_access_token = await getGoogleToken()
    const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId: '1GLN7_-mqagdV0yoQUIGjBqs4orP9StAGwqlJXYfKwQQ', range: 'elbise!A:F' })

    let categoryItems = []
    for (let value of sheetData.values.filter((c, i) => i > 0)) {
        const keyword = value[0]
        const parentorchild = value[1]
        const parentkey = value[2]
        const title = value[3]
        const negwords = value[4]
        const exactmatch = value[5]

        categoryItems.push({ keyword, parentorchild, parentkey, title, negwords, exactmatch })
    }

    const groupByParentKey = categoryItems.filter(f=>f.parentorchild==='parent').reduce((prev,curr)=>{
      return {...prev,[curr.parentkey]:{title:curr.title, childkeywords:categoryItems.filter((f)=>f.parentkey===curr.parentkey)}}
    
    },{})
   
    await makeDir('search-keywords')
    if (fs.existsSync(`${process.cwd()}/search-keywords/elbise.json`)) {
        fs.unlinkSync(`${process.cwd()}/search-keywords/elbise.json`)
    }
    fs.appendFileSync(`${process.cwd()}/search-keywords/elbise.json`, JSON.stringify(groupByParentKey))
    debugger
})()
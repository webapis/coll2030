


(async () => {
  console.log('--------------REMOVING DUBLICATE DATA STARTED-------------')
  const { importData, exportData } = require('./mongoDb')

  await importData({ collectionName: 'data', folder: 'data' })

  await genNav()



  await exportData({ exportPath: `${process.cwd()}/api/_files/kadin/data.json`, collectionName: 'data', aggegation: [] })
  console.log('-------------REMOVING DUBLICATE DATA COMPLETE---------------')
  process.exit(0)

})()





async function genNav() {




  var TAFFY = require('taffy');
  const fs = require('fs')
  const { mongoClient, extractNavData } = require('./mongoDb')
  const { productTitleMatch } = require('../api/kadin/productTitleMatch')
  const makeDir = require('make-dir');

  const dataCollection = await mongoClient({ collectionName: 'data' })
  const data = require(`${process.cwd()}/api/_files/kadin/data.json`)
  await makeDir('public/nav-keywords')
  await makeDir(`public/nav-data/elbise`)
  var products = TAFFY(data);
  const { getCombinations } = require('../nav-keys/combination')
  debugger
  const allkeywords = fs.existsSync(`${process.cwd()}/api/_files/kadin/keywords.json`) && require(`${process.cwd()}/api/_files/kadin/keywords.json`)
  let navKeys = { start: { navMatch: [], keywords: {} } }

  let objCounter = 0
  await dataCollection.find().forEach(async (object) => {

    ++objCounter
    console.log('objCounter...', objCounter)
    const { subcategory, title, imageUrl, marka } = object

    let navMatchCollection = []
    if (title) {

      let matchfound = false

      const keywords = allkeywords[subcategory]


      if (keywords && keywords.length > 0) {


        const navMatch = keywords.map((m, i) => { return { ...m, index: m.index.toString() + '-' } }).filter((kws) => {

          //  let parentKeyWord = kws.parentkey
          let exactmatch = kws.exactmatch
          let negwords = kws.negwords
          //  let keywordTitle = kws.title
          //   let group = kws.group

          let nws = []
          if (negwords) {
            nws = negwords.split(',')

          }

          const kw = kws.keyword
          const match = productTitleMatch({ kw, title, exactmatch, nws })


          return match
        })

        if (navMatch.length > 0) {
          navMatchCollection.push(navMatch)

          const possibleCombination = getCombinations(navMatch.map((m) => m.index))

          possibleCombination.forEach(async (comb) => {

            if (navKeys[comb] === undefined) {
              navKeys[comb] = { keywords: {} }
            }
            navMatch.forEach(nm => {
              const { keyword, group, index } = nm

              if (navKeys[comb].keywords[keyword] === undefined) {

                navKeys[comb].keywords[keyword] = { count: 1, group: group.trim(), index, imageUrl, marka }
              }
              else {
                const count = navKeys[comb].keywords[keyword].count
                navKeys[comb].keywords[keyword] = { count: count + 1, group: group.trim(), index, imageUrl, marka }
              }

            })



          })

          navMatch.forEach(nm => {
            const { keyword, group, index } = nm

            if (navKeys.start.keywords[keyword] === undefined) {

              navKeys.start.keywords[keyword] = { count: 1, group: group.trim(), index, imageUrl, marka }
            }
            else {
              const count = navKeys.start.keywords[keyword].count
              navKeys.start.keywords[keyword] = { count: count + 1, group: group.trim(), index, imageUrl, marka }
            }

          })

        }


      }







    }
  })//end

  fs.rmSync(`${process.cwd()}/public/nav-data`, { recursive: true, force: true });

  // await  Promise.all(input.map(({ navMatchCollection, title,subcategory }) => {

  //     return limit(() => workerPromise({ navMatchCollection, title,subcategory }))
  //   }))
  console.log('nav gen complete')
  debugger
  let regrouped = []
  for (let nk in navKeys) {
    const { keywords } = navKeys[nk]
    debugger
    const map = Object.entries(keywords).map((m) => { return { ...m[1], keyword: m[0] } })
    debugger
    const navKeywords = map.reduce((prev, curr) => {
      debugger
      if (prev[curr.group] === undefined) {
        return { ...prev, [curr.group]: { keywords: [{ keyword: curr.keyword, index: curr.index, count: curr.count, imageUrl: curr.imageUrl,marka:curr.marka }] } }
      } else {


        return {
          ...prev, [curr.group]: { keywords: [...prev[curr.group].keywords, { keyword: curr.keyword, index: curr.index, count: curr.count, imageUrl: curr.imageUrl,marka:curr.marka }] }
        }
      }

    }, {})

    const sorted = Object.entries(navKeywords).map((m, i) => {
      const groupName = m[0]
      debugger
      const keywords = m[1]['keywords'].sort(function (a, b) {
        var textA = a.keyword.toUpperCase();
        var textB = b.keyword.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })

      return { groupName, keywords }
    }).sort(function (a, b) {
      var textA = a.groupName.toUpperCase();
      var textB = b.groupName.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    regrouped.push({ index: nk, keywords: sorted })
    debugger
    // if (fs.existsSync(`${process.cwd()}/public/nav-keywords/${nk}.json`)) {
    //   fs.unlinkSync(`${process.cwd()}/public/nav-keywords/${nk}.json`)
    // }
    // fs.appendFileSync(`${process.cwd()}/public/nav-keywords/${nk}.json`, JSON.stringify(sorted));

    debugger
  }
  await makeDir(`api/_files/nav`)
  if (fs.existsSync(`${process.cwd()}/api/_files/nav/nav-keywords.json`)) {
    fs.unlinkSync(`${process.cwd()}/api/_files/nav/nav-keywords.json`)
  }
  fs.appendFileSync(`${process.cwd()}/api/_files/nav/nav-keywords.json`, JSON.stringify(regrouped));
  debugger
  console.log('end....1')



}




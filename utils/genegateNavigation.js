


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

  var promiseLimit = require('promise-limit')

  var limit = promiseLimit(2)
  var input = []
  const { workerPromise } = require('../temp/workerPromise')
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
    const { subcategory, title } = object
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

                navKeys[comb].keywords[keyword] = { count: 1, group: group.trim(), index }
              }
              else {
                const count = navKeys[comb].keywords[keyword].count
                navKeys[comb].keywords[keyword] = { count: count + 1, group: group.trim(), index }
              }

            })

            //await workerPromise({ navMatch, title })

            //querydata

            // var filteredData = products().filter(function () {
            //   const title = this.title
            //   const matchfound = navMatch.filter((kws) => {

            //     let exactmatch = kws.exactmatch
            //     let negwords = kws.negwords
            //     let nws = []
            //     if (negwords) {
            //       nws = negwords.split(',')

            //     }

            //     const kw = kws.keyword
            //     const match = productTitleMatch({ kw, title, exactmatch, nws })
            //     return match
            //   })

            //   if (title) {


            //   } else {

            //   }

            //   return matchfound.length === navMatch.length
            // }).get()

            //  await makeDir(`public/nav-data/${subcategory}`)
            //  if (fs.existsSync(`public/nav-data/${subcategory}/${comb}.json`)) {
            //    fs.unlinkSync(`public/nav-data/${subcategory}/${comb}.json`)
            //  }
            // fs.appendFile(`public/nav-data/${subcategory}/${comb}.json`, JSON.stringify(filteredData)).then(() => {
            //   console.log('done')
            // })

          })

          navMatch.forEach(nm => {
            const { keyword, group, index } = nm

            if (navKeys.start.keywords[keyword] === undefined) {

              navKeys.start.keywords[keyword] = { count: 1, group: group.trim(), index }
            }
            else {
              const count = navKeys.start.keywords[keyword].count
              navKeys.start.keywords[keyword] = { count: count + 1, group: group.trim(), index }
            }

          })

        }


      }

    //  input.push({ navMatchCollection, title,subcategory })





    }
  })//end

  fs.rmSync(`${process.cwd()}/public/nav-data`, { recursive: true, force: true });

// await  Promise.all(input.map(({ navMatchCollection, title,subcategory }) => {

//     return limit(() => workerPromise({ navMatchCollection, title,subcategory }))
//   }))
console.log('nav gen complete')
  debugger

  for (let nk in navKeys) {
    const current = navKeys[nk]
    if (fs.existsSync(`${process.cwd()}/public/nav-keywords/${nk}.json`)) {
      fs.unlinkSync(`${process.cwd()}/public/nav-keywords/${nk}.json`)
    }
    fs.appendFileSync(`${process.cwd()}/public/nav-keywords/${nk}.json`, JSON.stringify(current));

    debugger
  }
  debugger
  console.log('end....1')



}




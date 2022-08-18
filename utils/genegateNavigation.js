


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



  const fs = require('fs')
  const { mongoClient } = require('./mongoDb')
  const { productTitleMatch } = require('../api/kadin/productTitleMatch')
  const makeDir = require('make-dir');

  const dataCollection = await mongoClient({ collectionName: 'data' })

  await makeDir('public/nav-keywords')
  await makeDir(`public/nav-data/elbise`)
  const categoryNav = {}
  const { getCombinations } = require('../nav-keyssdsdsd/combination')

  const allkeywords = fs.existsSync(`${process.cwd()}/api/_files/kadin/keywords.json`) && require(`${process.cwd()}/api/_files/kadin/keywords.json`)
  let navKeys = { start: { navMatch: [], keywords: {} } }

  let objCounter = 0
  await dataCollection.find().forEach(async (object) => {

    ++objCounter
    // console.log('objCounter...', objCounter)
    const { subcategory, title, imageUrl, marka, priceNew } = object
    if (categoryNav[subcategory] === undefined) {
      categoryNav[subcategory] = { count: 0 }
    }
    else {
      categoryNav[subcategory].count = categoryNav[subcategory].count + 1
    }

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
          let group = kws.group
          if (group === 'FIYAT ARALIĞI') {
            const priceRange = kws.keyword.split('-').map(m => parseInt(m).toFixed(2))
            const startPrice = parseFloat(priceRange[0])
            const endPrice = parseFloat(priceRange[1])

            try {
              const price =priceNew.toString().replace('.', '').replace(',', '.')
              const productPrice = parseFloat(price)

              debugger
              //  const productPrice = parseFloat(priceNew.replace('.', '').replace(',', '.'))
              if (endPrice) {

                if (productPrice >= startPrice && productPrice <= endPrice) {
                  return true
                } else {
                  return false;
                }

              }
              else {
                debugger
                if (productPrice >= startPrice) {
                  return true
                } else {

                  return false
                }

              }
            } catch (error) {
              debugger
            }

          } else {

            let nws = []
            if (negwords) {
              nws = negwords.split(',')

            }
            const kw = kws.keyword
            const match = productTitleMatch({ kw, title, exactmatch, nws })
            return match
          }




        })

        if (navMatch.length > 0) {

          navMatchCollection.push(navMatch)

          const possibleCombination = getCombinations(navMatch.map((m) => m.index))

          possibleCombination.forEach(async (c) => {
            const comb = c.split('-').filter(f => f !== '').map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
            const mapComb = comb.split('-').filter(f => f !== '').map((m) => {
              const obj = navMatch.find(f => f.index.replace('-', '').trim() === m)
              return obj
            })
            let doubleExist = false
            for (let g of mapComb) {
              let match = navMatch.filter(f => f.groupid === g.groupid)
              if (match.length > 1) {
                doubleExist = true

              }

            }
            if (!doubleExist) {




              if (navKeys[comb] === undefined) {
                navKeys[comb] = { keywords: {} }
              }
              navMatch.forEach(nm => {
                const { keyword, group, index, parentkey } = nm

                if (navKeys[comb].keywords[keyword] === undefined) {

                  navKeys[comb].keywords[keyword] = { count: 1, group: group.trim(), index, imageUrl, marka, parentkey }
                }
                else {
                  const count = navKeys[comb].keywords[keyword].count
                  navKeys[comb].keywords[keyword] = { count: count + 1, group: group.trim(), index, imageUrl, marka, parentkey }
                }

              })




            }
          })
          navMatch.forEach(nm => {
            const { keyword, group, index, parentkey } = nm

            if (navKeys.start.keywords[keyword] === undefined) {

              navKeys.start.keywords[keyword] = { count: 1, group: group.trim(), index, imageUrl, marka, parentkey }
            }
            else {
              const count = navKeys.start.keywords[keyword].count
              navKeys.start.keywords[keyword] = { count: count + 1, group: group.trim(), index, imageUrl, marka, parentkey }
            }

          })


        }


      }

    }
  })//end

  fs.rmSync(`${process.cwd()}/public/nav-data`, { recursive: true, force: true });


  console.log('nav gen complete')

  let regrouped = []
  for (let nk in navKeys) {
    const { keywords } = navKeys[nk]

    const map = Object.entries(keywords).map((m) => { return { ...m[1], keyword: m[0] } })

    const navKeywords = map.reduce((prev, curr) => {

      if (prev[curr.group] === undefined) {
        return { ...prev, [curr.group]: { keywords: [{ keyword: curr.keyword, index: curr.index, count: curr.count, imageUrl: curr.imageUrl, marka: curr.marka, parentkey: curr.parentkey }] } }
      } else {


        return {
          ...prev, [curr.group]: { keywords: [...prev[curr.group].keywords, { keyword: curr.keyword, index: curr.index, count: curr.count, imageUrl: curr.imageUrl, marka: curr.marka, parentkey: curr.parentkey }] }
        }
      }

    }, {})

    const sorted = Object.entries(navKeywords).map((m, i) => {
      const groupName = m[0]

      const keywords = m[1]['keywords'].sort(function (a, b) {
        var textA = a.parentkey.toUpperCase();
        var textB = b.parentkey.toUpperCase();

        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })

      return { groupName, keywords }
    }).sort(function (a, b) {
      var textA = a.groupName.toUpperCase();
      var textB = b.groupName.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    regrouped.push({ index: nk, keywords: sorted })


  }
  debugger
  await makeDir(`api/_files/nav`)
  debugger

  if (fs.existsSync(`${process.cwd()}/api/_files/nav/nav-keywords.json`)) {
    fs.unlinkSync(`${process.cwd()}/api/_files/nav/nav-keywords.json`)
  }
  fs.appendFileSync(`${process.cwd()}/api/_files/nav/nav-keywords.json`, JSON.stringify(regrouped));

  // for (let cr of regrouped) {
  //   debugger
  //   const { index, keywords } = cr
  //   console.log('index', index)
  //   fs.appendFileSync(`${process.cwd()}/public/nav-keywords/${index}.json`, JSON.stringify(keywords));
  //   debugger


  //   debugger
  // }

  // debugger
  // const slicedArray = sliceIntoChunks(regrouped, 10)
  // debugger
  // global.navItems = 0
  // global.itemsTotal = slicedArray.length * 10
  // await Promise.all(slicedArray.map(async (buffers, i) => {



  //   return limit(async () => await workerPromise({ buffers }))


  // }))


  if (fs.existsSync(`${process.cwd()}/src/category-nav.json`)) {
    fs.unlinkSync(`${process.cwd()}/src/category-nav.json`)
  }
  const categoryAsArray = Object.entries(categoryNav).map(c => {

    return { subcategory: c[0], total: c[1].count }
  }).sort((a, b) => {

    var textA = a['subcategory'].toUpperCase();
    var textB = b['subcategory'].toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })


  fs.appendFileSync(`${process.cwd()}/src/category-nav.json`, JSON.stringify(categoryAsArray));
  console.log('end....1')

}



function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

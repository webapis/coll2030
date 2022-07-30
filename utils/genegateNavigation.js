


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
  const { mongoClient, extractNavData } = require('./mongoDb')
  const { productTitleMatch } = require('../api/kadin/productTitleMatch')
  const makeDir = require('make-dir');
  const markaNavCollection = await mongoClient({ collectionName: 'marka-nav' })
  const categoryNavCollection = await mongoClient({ collectionName: 'category-nav' })
  const dataCollection = await mongoClient({ collectionName: 'data' })
  await categoryNavCollection.deleteMany({})
  await markaNavCollection.deleteMany({})
  const navKeywords = require('../nav-keys/nav-keywords.json')
  const { getCombinations } = require('../nav-keys/combination')
  debugger
  let categoryTree = {}
  let markaTree = {}
  let navKeys = { start: { navMatch: [], keywords: {} } }
  let categoryNav = {
    nav: { totalByCategory: 1, categories: {} }
  }
  let markaNav = { nav: { totalByMarka: 1, markas: {} } }
  let objCounter = 0
  await dataCollection.find().forEach(async (object) => {

    ++objCounter
    console.log('objCounter...', objCounter)
    const { category, subcategory, marka, title, _id } = object

    if (title) {

      const navMatch = navKeywords.map((m, i) => { return { ...m, index: i.toString() + '-' } }).filter((f) => title.toLowerCase().includes(f.keyword))

      if (navMatch.length > 0) {

        const possibleCombination = getCombinations(navMatch.map((m) => m.index))
        possibleCombination.forEach(comb => {

          if (navKeys[comb] === undefined) {

            navKeys[comb] = { navMatch, keywords: {} }
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
        debugger
      }
      let matchfound = false
      const allkeywords = fs.existsSync(`${process.cwd()}/api/_files/kadin/keywords.json`) && require(`${process.cwd()}/api/_files/kadin/keywords.json`)
      const keywordsCollection = allkeywords[subcategory]
      if (categoryTree[`${subcategory}`] === undefined) {

        categoryTree[`${subcategory}`] = {}
      }
      if (markaTree[`${marka}`] === undefined) {

        markaTree[`${marka}`] = {}


      }

      if (markaTree[`${marka}`][`${subcategory}`] === undefined) {

        markaTree[`${marka}`][`${subcategory}`] = {}
      }
      for (let key in keywordsCollection) {


        const current = keywordsCollection[key]
        const keywords = current.childkeywords

        if (keywords.length > 0) {



          keywords.forEach((kws, i) => {

            let parentKeyWord = kws.parentkey
            let exactmatch = kws.exactmatch
            let negwords = kws.negwords
            let keywordTitle = kws.title
            let group = kws.group

            let nws = []
            if (negwords) {
              nws = negwords.split(',')

            }

            const kw = kws.keyword
            const match = productTitleMatch({ kw, title, exactmatch, nws })


            if (match) {


              matchfound = true

              if (categoryTree[`${subcategory}`][`${parentKeyWord}`] === undefined) {
                categoryTree[`${subcategory}`][`${parentKeyWord}`] = { keywords: {} }
                categoryTree[`${subcategory}`][`${parentKeyWord}`].title = keywordTitle && keywordTitle
                categoryTree[`${subcategory}`][`${parentKeyWord}`].group = group && group
              }


              if (markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`] === undefined) {
                markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`] = { keywords: {} }
                markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`].title = keywordTitle && keywordTitle
                markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`].group = group && group
              }


              categoryTree[`${subcategory}`][`${parentKeyWord}`].keywords[`${kw}`] === undefined ? categoryTree[`${subcategory}`][`${parentKeyWord}`].keywords[`${kw}`] = 1 : categoryTree[`${subcategory}`][`${parentKeyWord}`].keywords[`${kw}`] = categoryTree[`${subcategory}`][`${parentKeyWord}`].keywords[`${kw}`] + 1
              markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`].keywords[`${kw}`] === undefined ? markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`].keywords[`${kw}`] = 1 : markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`].keywords[`${kw}`] = markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`].keywords[`${kw}`] + 1


            }

          })
        }


      }


      if (matchfound === false) {
        if (categoryTree[`${subcategory}`].diğer === undefined) {

          categoryTree[`${subcategory}`].diğer = { keywords: {} }
          categoryTree[`${subcategory}`].group = 'diğer'
        }


        if (markaTree[`${marka}`][`${subcategory}`].diğer === undefined) {

          markaTree[`${marka}`][`${subcategory}`].diğer = { keywords: {} }
          markaTree[`${marka}`][`${subcategory}`].group = 'diğer'
        }
        categoryTree[`${subcategory}`].diğer.keywords.diğer === undefined ? categoryTree[`${subcategory}`].diğer.keywords.diğer = 1 : categoryTree[`${subcategory}`].diğer.keywords.diğer = categoryTree[`${subcategory}`].diğer.keywords.diğer + 1
        markaTree[`${marka}`][`${subcategory}`].diğer.keywords.diğer === undefined ? markaTree[`${marka}`][`${subcategory}`].diğer.keywords.diğer = 1 : markaTree[`${marka}`][`${subcategory}`].diğer.keywords.diğer = markaTree[`${marka}`][`${subcategory}`].diğer.keywords.diğer + 1
        await dataCollection.updateOne({ _id }, { $set: { title: title + ' ' + 'diğer' } })
      }
      updateDatabase({ pc: { category, subcategory }, marka, markaNavCollection, categoryNavCollection, categoryNav, markaNav })
      // updateVar({ category, subcategory,markaNavTree,categoryNavTree })


    }
  })//end



  const splitCategoryKeywrods = Object.entries(categoryTree)
  const splitMarkaKeywords = Object.entries(markaTree)

  for (let kwds of splitMarkaKeywords) {

    const marka = kwds[0]
    const keywords = kwds[1]
    await makeDir('public/keywords/marka')
    const path = `${process.cwd()}/public/keywords/marka/${marka}.json`
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
    fs.appendFileSync(path, JSON.stringify(keywords));

  }

  for (let kwds of splitCategoryKeywrods) {

    const category = kwds[0]
    const keywords = kwds[1]
    await makeDir('public/keywords/category')
    const path = `${process.cwd()}/public/keywords/category/${category}.json`
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
    fs.appendFileSync(path, JSON.stringify(keywords));

  }
  if (fs.existsSync(`${process.cwd()}/src/category-nav.json`)) {
    fs.unlinkSync(`${process.cwd()}/src/category-nav.json`)
  }
  fs.appendFileSync(`${process.cwd()}/src/category-nav.json`, JSON.stringify([categoryNav]));

  if (fs.existsSync(`${process.cwd()}/src/marka-nav.json`)) {
    fs.unlinkSync(`${process.cwd()}/src/marka-nav.json`)
  }
  fs.appendFileSync(`${process.cwd()}/src/marka-nav.json`, JSON.stringify([markaNav]));

  debugger
  await makeDir('public/nav-keywords')
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
  // await extractNavData({ collection: categoryNavCollection, exportPath: `${process.cwd()}/src/category-nav.json` })
  // await extractNavData({ collection: markaNavCollection, exportPath: `${process.cwd()}/src/marka-nav.json` })





}



function updateDatabase({ pc, marka, markaNavCollection, categoryNavCollection, markaNav, categoryNav }) {

  const { category, subcategory, regex } = pc

  if (categoryNav.nav.categories[category] === undefined) {
    categoryNav.nav.categories[category] = { totalBySubcategory: 1 }
  } else {
    categoryNav.nav.categories[category].totalBySubcategory = categoryNav.nav.categories[category].totalBySubcategory + 1
  }
  if (categoryNav.nav.categories[category].subcategories === undefined) {
    categoryNav.nav.categories[category].subcategories = {}
  }


  if (categoryNav.nav.categories[category].subcategories[subcategory] === undefined) {
    categoryNav.nav.categories[category].subcategories[subcategory] = { count: 1 }
  } else {
    categoryNav.nav.categories[category].subcategories[subcategory].count = categoryNav.nav.categories[category].subcategories[subcategory].count + 1
  }

  if (markaNav.nav.markas[marka] === undefined) {
    markaNav.nav.markas[marka] = { totalByCatory: 1 }
  } else {
    markaNav.nav.markas[marka].totalByCatory = markaNav.nav.markas[marka].totalByCatory + 1
  }

  if (markaNav.nav.markas[marka].categories === undefined) {
    markaNav.nav.markas[marka].categories = {}
  }

  if (markaNav.nav.markas[marka].categories[category] === undefined) {
    markaNav.nav.markas[marka].categories[category] = { totalBySubcategory: 1 }
  } else {
    markaNav.nav.markas[marka].categories[category].totalBySubcategory = markaNav.nav.markas[marka].categories[category].totalBySubcategory + 1
  }

  if (markaNav.nav.markas[marka].categories[category].subcategories === undefined) {
    markaNav.nav.markas[marka].categories[category].subcategories = {}
  }


  if (markaNav.nav.markas[marka].categories[category].subcategories[subcategory] === undefined) {
    markaNav.nav.markas[marka].categories[category].subcategories[subcategory] = { count: 1 }
  } else {
    markaNav.nav.markas[marka].categories[category].subcategories[subcategory].count = markaNav.nav.markas[marka].categories[category].subcategories[subcategory].count + 1
  }


  // await categoryNavCollection.updateOne({}, { $inc: { [`nav.totalByCategory`]: 1 } }, { upsert: true })
  // await categoryNavCollection.updateOne({}, { $inc: { [`nav.categories.${category}.totalBySubcategory`]: 1 } }, { upsert: true })
  // // await categoryNavCollection.updateOne({}, { $set: { [`nav.categories.${category}.subcategories.${subcategory}.regex`]: regex } }, { upsert: true })
  // await categoryNavCollection.updateOne({}, { $inc: { [`nav.categories.${category}.subcategories.${subcategory}.count`]: 1 } }, { upsert: true })

  // await markaNavCollection.updateOne({}, { $inc: { [`nav.totalByMarka`]: 1 } }, { upsert: true })
  // await markaNavCollection.updateOne({}, { $inc: { [`nav.markas.${marka}.totalByCatory`]: 1 } }, { upsert: true })
  // await markaNavCollection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.totalBySubcategory`]: 1 } }, { upsert: true })
  // //  await markaNavCollection.updateOne({}, { $set: { [`nav.markas.${marka}.categories.${category}.subcategories.${subcategory}.regex`]: regex } }, { upsert: true })
  // await markaNavCollection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.subcategories.${subcategory}.count`]: 1 } }, { upsert: true })

}
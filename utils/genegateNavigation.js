


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

  let categoryTree = {}
  let markaTree = {}
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

        debugger
        const current = keywordsCollection[key]
        const keywords = current.childkeywords

        if (keywords.length > 0) {


    
          keywords.forEach((kws, i) => {

            let parentKeyWord = kws.parentkey
            let exactmatch = kws.exactmatch
            let negwords = kws.negwords
            let nws = []
            if (negwords) {
              nws = negwords.split(',')

            }

            const kw = kws.keyword
            const match = productTitleMatch({ kw, title, exactmatch, nws })


            if (match) {
              matchfound = true
             
              if (categoryTree[`${subcategory}`][`${parentKeyWord}`] === undefined) {

                categoryTree[`${subcategory}`][`${parentKeyWord}`] = {}
              }


              if (markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`] === undefined) {

                markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`] = {}
              }


              categoryTree[`${subcategory}`][`${parentKeyWord}`][`${kw}`] === undefined ? categoryTree[`${subcategory}`][`${parentKeyWord}`][`${kw}`] = 1 : categoryTree[`${subcategory}`][`${parentKeyWord}`][`${kw}`] = categoryTree[`${subcategory}`][`${parentKeyWord}`][`${kw}`] + 1
              markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`][`${kw}`] === undefined ? markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`][`${kw}`] = 1 : markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`][`${kw}`] = markaTree[`${marka}`][`${subcategory}`][`${parentKeyWord}`][`${kw}`] + 1


            } 

          })
        }


      }


      if (matchfound === false) {
        if (categoryTree[`${subcategory}`].diğer === undefined) {

          categoryTree[`${subcategory}`].diğer = {}
        }


        if (markaTree[`${marka}`][`${subcategory}`].diğer === undefined) {

          markaTree[`${marka}`][`${subcategory}`].diğer = {}
        }
        categoryTree[`${subcategory}`].diğer.diğer === undefined ? categoryTree[`${subcategory}`].diğer.diğer = 1 : categoryTree[`${subcategory}`].diğer.diğer = categoryTree[`${subcategory}`].diğer.diğer + 1
        markaTree[`${marka}`][`${subcategory}`].diğer.diğer === undefined ? markaTree[`${marka}`][`${subcategory}`].diğer.diğer = 1 : markaTree[`${marka}`][`${subcategory}`].diğer.diğer = markaTree[`${marka}`][`${subcategory}`].diğer.diğer + 1
        await dataCollection.updateOne({ _id }, { $set: { title: title + ' ' + 'diğer' } })
      }
      updateDatabase({ pc: { category, subcategory }, marka, markaNavCollection, categoryNavCollection, categoryNav, markaNav })
      // updateVar({ category, subcategory,markaNavTree,categoryNavTree })



    }
  })//end

  debugger

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


const fs = require('fs')
const { mongoClient, extractNavData } = require('./mongoDb')
var through = require("through2");
const makeDir = require('make-dir');
const path = require('path')
const { productTitleMatch } = require('../api/kadin/productTitleMatch')
var jsonArrayStreams = require("json-array-streams");

async function generateNavigation() {
    const markaNavCollection = await mongoClient({ collectionName: 'marka-nav' })
    const categoryNavCollection = await mongoClient({ collectionName: 'category-nav' })
    await categoryNavCollection.deleteMany({})
    await markaNavCollection.deleteMany({})
    let categoryTree = {}
    let markaTree = {}
 
    return new Promise(async (resolve, reject) => {
        const readstream = fs.createReadStream("./api/_files/kadin/data.json")
        const data = fs.readFileSync("./api/_files/kadin/data.json")
        const totalObjects = JSON.parse(data).length
        console.log('totalObjects', totalObjects)
        let objCounter = 0
        readstream.pipe(jsonArrayStreams.parse())
            .pipe(through.obj(async function (object, enc, cb) {
                ++objCounter
                console.log('objCounter...', objCounter)
                const { category, subcategory, marka, title } = object
                const allkeywords = fs.existsSync(`${process.cwd()}/api/_files/kadin/keywords.json`) && require(`${process.cwd()}/api/_files/kadin/keywords.json`)
                const keywordsCollection= allkeywords[subcategory]
debugger
                for (let key in keywordsCollection) {
                    const current = keywordsCollection[key]
                    const keywords = current.childkeywords

                    if (keywords.length > 0) {

                        keywords.forEach(kws => {

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
                                if (categoryTree[`${subcategory}`] === undefined) {

                                    categoryTree[`${subcategory}`] = {}
                                }
                                if (categoryTree[`${subcategory}`][`${parentKeyWord}`] === undefined) {

                                    categoryTree[`${subcategory}`][`${parentKeyWord}`] = {}
                                }

                                if (markaTree[`${marka}`] === undefined) {

                                    markaTree[`${marka}`] = {}


                                }
                                if (markaTree[`${marka}`][`${subcategory}`] === undefined) {

                                    markaTree[`${marka}`][`${subcategory}`] = {}
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
                await updateDatabase({ pc: { category, subcategory }, marka, markaNavCollection, categoryNavCollection })
                // updateVar({ category, subcategory,markaNavTree,categoryNavTree })
                if (objCounter === totalObjects) {
                    debugger;
                    const splitCategoryKeywrods = Object.entries(categoryTree)
                    const splitMarkaKeywords = Object.entries(markaTree)
                    debugger;
                    for (let kwds of splitMarkaKeywords) {

                        const marka = kwds[0]
                        const keywords = kwds[1]
                        const path = `${process.cwd()}/public/keywords/marka/${marka}.json`
                        if (fs.existsSync(path)) {
                            fs.unlinkSync(path)
                        }
                        fs.appendFileSync(path, JSON.stringify(keywords));
                        debugger;
                    }

                    for (let kwds of splitCategoryKeywrods) {

                        const category = kwds[0]
                        const keywords = kwds[1]
                        const path = `${process.cwd()}/public/keywords/category/${category}.json`
                        if (fs.existsSync(path)) {
                            fs.unlinkSync(path)
                        }
                        fs.appendFileSync(path, JSON.stringify(keywords));
                        debugger;
                    }
                    debugger;
                    console.log('end....1')
                    await extractNavData({ collection: categoryNavCollection, exportPath: `${process.cwd()}/public/category-nav.json` })
                    await extractNavData({ collection: markaNavCollection, exportPath: `${process.cwd()}/public/marka-nav.json` })
                    return resolve(true)

                }
                cb()
            }))


        readstream.on('end', async (data) => {
            console.log('end')
        })
        readstream.on('error', (error) => {
            debugger;
            return reject(error)
        })
    })
}

(async () => {
    console.log('---------------NAV GENERATION STARTED----------------')
    await generateNavigation()
    console.log('---------------NAV GENERATION COMPLETE----------------')
    process.exit(0)
})()



async function updateDatabase({ pc, marka, markaNavCollection, categoryNavCollection }) {

    const { category, subcategory, regex } = pc
    await categoryNavCollection.updateOne({}, { $inc: { [`nav.totalByCategory`]: 1 } }, { upsert: true })
    await categoryNavCollection.updateOne({}, { $inc: { [`nav.categories.${category}.totalBySubcategory`]: 1 } }, { upsert: true })
    // await categoryNavCollection.updateOne({}, { $set: { [`nav.categories.${category}.subcategories.${subcategory}.regex`]: regex } }, { upsert: true })
    await categoryNavCollection.updateOne({}, { $inc: { [`nav.categories.${category}.subcategories.${subcategory}.count`]: 1 } }, { upsert: true })

    await markaNavCollection.updateOne({}, { $inc: { [`nav.totalByMarka`]: 1 } }, { upsert: true })
    await markaNavCollection.updateOne({}, { $inc: { [`nav.markas.${marka}.totalByCatory`]: 1 } }, { upsert: true })
    await markaNavCollection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.totalBySubcategory`]: 1 } }, { upsert: true })
    //  await markaNavCollection.updateOne({}, { $set: { [`nav.markas.${marka}.categories.${category}.subcategories.${subcategory}.regex`]: regex } }, { upsert: true })
    await markaNavCollection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.subcategories.${subcategory}.count`]: 1 } }, { upsert: true })
}

async function updateVar({ pc, marka, categoryNavTree, markaNavTree }) {

    const { category, subcategory, regex } = pc

}
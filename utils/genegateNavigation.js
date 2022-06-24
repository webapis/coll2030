

const fs = require('fs')
const { mongoClient, extractNavData } = require('./mongoDb')
var through = require("through2");
var jsonArrayStreams = require("json-array-streams");

async function generateNavigation() {
    const markaNavCollection = await mongoClient({ collectionName: 'marka-nav' })
    const categoryNavCollection = await mongoClient({ collectionName: 'category-nav' })
    await categoryNavCollection.deleteMany({})
    await markaNavCollection.deleteMany({})

    return new Promise(async (resolve, reject) => {
        const readstream = fs.createReadStream("./api/_files/kadin/data.json")
        const data = fs.readFileSync("./api/_files/kadin/data.json")
        const totalObjects = JSON.parse(data).length
        console.log('totalObjects',totalObjects)
        let objCounter = 0
        readstream.pipe(jsonArrayStreams.parse())
            .pipe(through.obj(async function (object, enc, cb) {
                ++objCounter
                console.log('objCounter...',objCounter)
                const {category,subcategory,marka } = object
           
                        await updateDatabase({pc:{category,subcategory}, marka, markaNavCollection, categoryNavCollection})
                    if (objCounter === totalObjects) {
                        console.log('end....1')
                        await extractNavData({ collection: categoryNavCollection, exportPath: `${process.cwd()}/src/components/categoryMenu/category-nav.json` })
                        await extractNavData({ collection: markaNavCollection, exportPath: `${process.cwd()}/src/components/MarkaMenu/marka-nav.json` })
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

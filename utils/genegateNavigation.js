
const { getGoogleToken } = require('../google/google.oauth')
const fs = require('fs')
const { getSheetValues, appendSheetValues } = require('../google.sheet.js')
const { mongoClient, extractNavData } = require('./mongoDb')

var through = require("through2");
var jsonArrayStreams = require("json-array-streams");

async function generateNavigation() {
    const markaNavCollection = await mongoClient({ collectionName: 'marka-nav' })
    const categoryNavCollection = await mongoClient({ collectionName: 'category-nav' })
    await categoryNavCollection.deleteMany({})
    await markaNavCollection.deleteMany({})
    const google_access_token = await getGoogleToken()
    const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId: '1TVFTCbMIlLXFxeXICx2VuK0XtlNLpmiJxn6fJfRclRw', range: 'categoriestest!A:C' })
    let categoryItems = []
    for (let value of sheetData.values.filter((c, i) => i > 0)) {
        const subcategory = value[0]
        const category = value[1]
        const regex = value[2]

        categoryItems.push({ subcategory, category, regex })
    }


    return new Promise(async (resolve, reject) => {

        let counter = 0

        const readstream = fs.createReadStream("./api/_files/kadin/data.json")
        const data = fs.readFileSync("./api/_files/kadin/data.json")
        const totalObjects = JSON.parse(data).length
        console.log('totalObjects',totalObjects)
        let objCounter = 0
        readstream.pipe(jsonArrayStreams.parse())
            .pipe(through.obj(async function (object, enc, cb) {
                ++objCounter
                console.log('objCounter...',objCounter)
                const { title: productTitle } = object
                const marka = productTitle.substring(0, productTitle.indexOf(" "))
                const productSubCategories = categoryItems.filter(c => {
                    const regex = new RegExp(c.regex, "i")
                    const result = regex.test(productTitle.toLowerCase())
                    return result
                })
           
                if (productSubCategories.length>0) {
                    debugger;
                   // const regex = new RegExp(productSubCategories.category, "i")
                   // const result = regex.test(productTitle.toLowerCase())
                  ////  if(result){
                       for(let d of productSubCategories){
                     debugger;
                        await updateDatabase({pc:d, marka, markaNavCollection, categoryNavCollection})
                       }
                   
                    //}
                      

                    if (objCounter === totalObjects) {

                        console.log('end....1')
                        await extractNavData({ collection: categoryNavCollection, exportPath: `${process.cwd()}/src/components/categoryMenu/category-nav.json` })
                        await extractNavData({ collection: markaNavCollection, exportPath: `${process.cwd()}/src/components/MarkaMenu/marka-nav.json` })
                        return resolve(true)

                    }
               
                    cb()

                } else {
                    debugger;
                    const findcategory = categoryItems.find(c => {
                        const regex = new RegExp(c.category, 'i')
                        const result = regex.test(productTitle.toLowerCase())

                        return result
                    })

                    if (findcategory) {
                    //    await updateDatabase({pc:{category: findcategory.category,subcategory: 'diğer', regex: 'diğer'}, marka, markaNavCollection, categoryNavCollection})
                    
                    } else {
                        await updateDatabase({pc:{category: 'belirsiz',subcategory: 'belirsiz', regex: 'belirsiz'}, marka, markaNavCollection, categoryNavCollection})
                   
                    }
               
                  
         
                    if (objCounter === totalObjects) {

                        console.log('end')


                    } else {

                    }
                    if(objCounter===totalObjects){
                        console.log('end....2')
                        await extractNavData({ collection: categoryNavCollection, exportPath: `${process.cwd()}/src/components/categoryMenu/category-nav.json` })
                        await extractNavData({ collection: markaNavCollection, exportPath: `${process.cwd()}/src/components/MarkaMenu/marka-nav.json` })
                        return resolve(true)
                    }
                    cb()
                }




            }))


        readstream.on('end', async (data) => {

            console.log('end')
            // await extractNavData({ collection: categoryNavCollection, exportPath: `${process.cwd()}/src/components/categoryMenu/category-nav.json` })
            // await extractNavData({ collection: markaNavCollection, exportPath: `${process.cwd()}/src/components/MarkaMenu/marka-nav.json` })
            // return resolve(true)

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
    await categoryNavCollection.updateOne({}, { $set: { [`nav.categories.${category}.subcategories.${subcategory}.regex`]: regex } }, { upsert: true })
    await categoryNavCollection.updateOne({}, { $inc: { [`nav.categories.${category}.subcategories.${subcategory}.count`]: 1 } }, { upsert: true })

    await markaNavCollection.updateOne({}, { $inc: { [`nav.totalByMarka`]: 1 } }, { upsert: true })
    await markaNavCollection.updateOne({}, { $inc: { [`nav.markas.${marka}.totalByCatory`]: 1 } }, { upsert: true })
    await markaNavCollection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.totalBySubcategory`]: 1 } }, { upsert: true })
    await markaNavCollection.updateOne({}, { $set: { [`nav.markas.${marka}.categories.${category}.subcategories.${subcategory}.regex`]: regex } }, { upsert: true })
    await markaNavCollection.updateOne({}, { $inc: { [`nav.markas.${marka}.categories.${category}.subcategories.${subcategory}.count`]: 1 } }, { upsert: true })
}

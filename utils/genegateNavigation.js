
const { getGoogleToken } = require('../google/google.oauth')
const fs = require('fs')
const { getSheetValues, appendSheetValues } = require('../google.sheet.js')
const { mongoClient, extractNavData } = require('./mongoDb')
async function generateNavigation() {

    const markaNavCollection = await mongoClient({ collectionName: 'marka-nav' })
    const categoryNavCollection = await mongoClient({ collectionName: 'category-nav' })
    await categoryNavCollection.deleteMany({})
    await markaNavCollection.deleteMany({})
    const google_access_token = await getGoogleToken()
    const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId: '1TVFTCbMIlLXFxeXICx2VuK0XtlNLpmiJxn6fJfRclRw', range: 'categoriestest!A:C' })
    var counter = 0
    //console.log('sheetData.......', sheetData)
    debugger;
    let categoryItems = []
    for (let value of sheetData.values.filter((c, i) => i > 0)) {
        const subcategory = value[0]
        const category = value[1]
        const regex = value[2]

        categoryItems.push({ subcategory, category, regex })
    }


    debugger;
    const data = fs.readFileSync(`api/_files/kadin/data.json`, { encoding: 'utf8' })
    debugger;
    const dataCollected = JSON.parse(data)
    const mapCategory = dataCollected.map((m) => {
        const match = categoryItems.find(c => {
            const regex = new RegExp(c.regex, 'i')
            const result = regex.test(m.title.toLowerCase())

            return result === true
        })
        debugger;
        let categoryExistsintitle = match && new RegExp(match.category, 'i').test(m.title)

        let category = match ? categoryExistsintitle ? '' : "_ "+match.category : "belirsiz"
        console.log('match', category)
        return {
            ...m, title: m.title + category
        }
    })

    for (let p of mapCategory) {
        const { title: productTitle, marka } = p
        const productSubCategories = categoryItems.filter(c => {
            const regex = new RegExp(c.regex, 'i')
            const result = regex.test(productTitle.toLowerCase())
            return result
        })
        debugger;

        if (productSubCategories.length > 0) {
            for (let d of productSubCategories) {
                counter = counter + 1
                console.log('counter', counter)
                const { category, subcategory, regex } = d
                debugger;
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

        } else {
            const findcategory = categoryItems.find(c => {
                const regex = new RegExp(c.category, 'i')
                const result = regex.test(productTitle.toLowerCase())

                return result
            })

            if (findcategory) {

                //  await productsNavDataset.pushData({ marka, category: findcategory.category, subcategory: 'diğer', regex: 'diğer' })
            } else {

                //  await productsNavDataset.pushData({ marka, category: 'belirsiz', subcategory: 'belirsiz', regex: 'belirsiz' })
            }

        }

        if (fs.existsSync('api/_files/kadin/data.json')) {
            fs.unlinkSync('api/_files/kadin/data.json')
        }
        fs.appendFileSync('api/_files/kadin/data.json', JSON.stringify(mapCategory))
        await extractNavData({ collection: categoryNavCollection, exportPath: './src/components/categoryMenu/category-nav.json' })
        await extractNavData({ collection: markaNavCollection, exportPath: './src/components/MarkaMenu/marka-nav.json' })
        debugger;
    }


}



(async () => {
    console.log('---------------NAV GENERATION STARTED----------------')
    await generateNavigation()
    console.log('---------------NAV GENERATION COMPLETE----------------')
    process.exit(0)
})()


/*
    const map2 = dataCollected.map((p, i) => {
            const productTitle = p.title


            const productSubCategory = categoryItems.find(c => {
                const regex = new RegExp(c.regex, 'i')
                const result = regex.test(productTitle.toLowerCase())
                return result
            })
            if (productSubCategory) {

                return { ...p, title: marka + " " + p.title + " _x " + productSubCategory.category, subcategory: productSubCategory.subcategory, category: productSubCategory.category }

            } else {

            
                const findcategory = categoryItems.find(c => {
                    const regex = new RegExp(c.category, 'i')
                    const result = regex.test(productTitle.toLowerCase())

                    return result
                })

                if (findcategory) {

                    return { ...p, title: marka + " " + p.title + " _x " + findcategory.category + " diğer", subcategory: "diğer", category: findcategory.category }
                } else {

                    return { ...p, title: marka + " " + p.title + " belirsiz", subcategory: "belirsiz", category: "belirsiz" }
                }

            }
        })
*/
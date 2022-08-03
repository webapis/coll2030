

(async () => {
    const {
        Worker, isMainThread, parentPort, workerData
    } = require('node:worker_threads');
    const { fileName } = workerData
    await job({ fileName })
})()



async function job({ subcategory = 'elbise', fileName }) {


    var TAFFY = require('taffy');



    var products = TAFFY(data);
    var path = require("path");
    const allkeywords = require(`${process.cwd()}/api/_files/kadin/keywords.json`)
    const fs = require('fs')
    const elbiseKeywords = allkeywords.elbise
    const { productTitleMatch } = require(`${process.cwd()}/api/kadin/productTitleMatch`)
    const { orderData } = require(`${process.cwd()}/api/kadin/orderData`)
    const fs = require('fs')
    const makeDir = require('make-dir');
    const { productTitleMatch } = require('../api/kadin/productTitleMatch')
    debugger

    await makeDir(`public/nav-data/${subcategory}`)

    return new Promise(async function (resolve) {

        let fName = path.basename(fileName);
        let keywordIndex = fName.substring(0, fName.indexOf('.json'))
        let splittedKeywordsIndex = keywordIndex.split('-')
        let foundkeywords = elbiseKeywords.filter(f => splittedKeywordsIndex.includes(f.index))

        var filteredData = products().filter(filterByKeyword).get()


        var orderedData = orderData(filteredData)
        var orderedDb = TAFFY(orderedData)

        var d = orderedDb().get()
        console.log('d', d.length)
        let count = orderedDb().count()
        foudCollections[keywordIndex] = d.length

        if (fs.existsSync(`public/nav-data/elbise/${keywordIndex}.json`)) {
            fs.unlinkSync(`public/nav-data/elbise/${keywordIndex}.json`)
        } else {
            fs.appendFileSync(`public/nav-data/elbise/${keywordIndex}.json`, JSON.stringify(filteredData))
            debugger
            resolve(true)
        }

        function filterByKeyword() {
            const title = this.title
            const match = foundkeywords.filter(kws => {
                let exactmatch = kws.exactmatch
                let negwords = kws.negwords
                let nws = []
                if (negwords) {
                    nws = negwords.split(',')

                }

                const kw = kws.keyword
                return productTitleMatch({ kw, title, exactmatch, nws })
            })

            return match.length === foundkeywords.length
        }


      
    })
}
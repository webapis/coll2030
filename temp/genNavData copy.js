const { workerPromise } = require('./workerPromise')
const { walkSync } = require('./walkSync')
const data = require(`${process.cwd()}/api/_files/kadin/data.json`)
const { orderData } = require(`${process.cwd()}/api/kadin/orderData`)
var path = require("path");
var TAFFY = require('taffy');
const { productTitleMatch } = require(`${process.cwd()}/api/kadin/productTitleMatch`)
let foudCollections = {}
const allkeywords = require(`${process.cwd()}/api/_files/kadin/keywords.json`)
const fs =require('fs')
const elbiseKeywords = allkeywords.elbise
var products = TAFFY(data);
debugger
const makeDir = require('make-dir');
 makeDir.sync(`public/nav-data/elbise`)
walkSync(`${process.cwd()}/public/nav-keywords`, function (fileName, state) {

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
        } else{
            fs.appendFileSync(`public/nav-data/elbise/${keywordIndex}.json`, JSON.stringify(filteredData))
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
debugger


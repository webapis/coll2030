var TAFFY = require('taffy');

const { productTitleMatch } = require('./productTitleMatch')
const { orderData } = require('./orderData')
const fs = require('fs')
const path = require('path');

function commonDataHandler({ start, search, selectedNavIndex,subcategory }) {
    debugger
    const allkeywords = require(path.join(process.cwd(), `./api/_files/nav/${subcategory}/keywords.json`))
    const data = []
    debugger
    const dirPath = path.join(`./api/_files/data/${subcategory}`)
    debugger
    const files = fs.readdirSync(dirPath)
    debugger
    for (let file of files) {

        const dataRaw = fs.readFileSync(`${dirPath}/${file}`, { encoding: 'utf8' })
        debugger
        const dataObjectArr = JSON.parse(dataRaw)

        data.push(...dataObjectArr)
    }
    debugger
    const startAt = parseInt(start)
    var products = TAFFY(data);

    const filterByKeyword = selectedNavIndex === '' ? function () { return true } : function filterByKeyword() {

        let splittedKeywordsIndex = selectedNavIndex.split('-').filter(f => f !== '')
        let foundkeywords = allkeywords[subcategory].filter(function (f) {
            const includes = splittedKeywordsIndex.includes(f.index)
            return includes
        })


        const title = this.title
        const priceNew = this.priceNew

        const match = foundkeywords.filter(kws => {
            let group = kws.group
            let negwords = kws.negwords
            let exactmatch = kws.exactmatch
            if (group === 'FIYAT ARALIĞI') {
                const priceRange = kws.keyword.split('-').map(m => parseInt(m).toFixed(2))
                const startPrice = parseFloat(priceRange[0])
                const endPrice = parseFloat(priceRange[1])
                try {
                    const price = priceNew.toString().replace('.', '').replace(',', '.')
                    const productPrice = parseFloat(price)

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

        return match.length === foundkeywords.length
    }

    const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(search, 'i') } }


    var filteredData = products().filter(filterBySearch).filter(filterByKeyword).get()

    debugger
    var orderedData = orderData(filteredData)
    var orderedDb = TAFFY(orderedData)

    var d = orderedDb().start(startAt).limit(100).get()
    let count = orderedDb().count()



    console.log('data.length', d.length)


    console.log('search', filterBySearch)

    console.log('startAt', startAt)
    console.log('count1', count)

    return { d, count }
}

module.exports = { commonDataHandler }
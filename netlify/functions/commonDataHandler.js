var TAFFY = require('taffy');

const { productTitleMatch } = require('./productTitleMatch')
const { orderData } = require('./orderData')
const fs = require('fs')
const path = require('path');

function commonDataHandler({ start, search, selectedNavIndex,subcategory }) {
    
    const allkeywords = require( path.join(process.cwd(),`api/_files/nav/keywords.json`))
    const data = []
    
    //const dirPath = path.join(`./api/_files/data/${subcategory}`)
    const cr =process.cwd()
    
    const dirPath = `${process.cwd()}/api/_files/data/${subcategory}`
    
    const files = fs.readdirSync(dirPath)
    
    for (let file of files) {

        const dataRaw = fs.readFileSync(`${dirPath}/${file}`, { encoding: 'utf8' })
        
        const dataObjectArr = JSON.parse(dataRaw)

        data.push(...dataObjectArr)
    }
    
    const startAt = parseInt(start)
    var products = TAFFY(data);
debugger
    const filterByKeyword = selectedNavIndex === '' ? function () { return true } : function filterByKeyword() {

        let splittedKeywordsIndex = selectedNavIndex.split('-').filter(f => f !== '')
        let foundkeywords = allkeywords.filter(function (f) {
            const includes = splittedKeywordsIndex.includes(f.index)
            return includes
        })
debugger

        const title = this.title
        const priceNew = this.priceNew

        const match = foundkeywords.filter(kws => {
    
            let negwords = kws.exclude
            let exactmatch = kws.exactmatch
            let groupName=kws.groupName
            let index =parseInt(  kws.index.replace('-','') )
            if (groupName==='Fiyat') {
                debugger
              
                    const priceRange = kws.keywords.split('-').map(m => parseInt(m).toFixed(2))
                    debugger
                    const startPrice = parseFloat(priceRange[0])
                    debugger
                    const endPrice = parseFloat(priceRange[1])
                    debugger
               
             
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
                const kw = kws.keywords
                const match = productTitleMatch({ kw, title, exactmatch, nws })
                return match
            }
        })

        return match.length === foundkeywords.length
    }

    const filterBySearch = search === '' ? {} : { title: { regex: new RegExp(search, 'i') } }


    var filteredData = products().filter(filterBySearch).filter(filterByKeyword).get()

    
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
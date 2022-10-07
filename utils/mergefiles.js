require('dotenv').config()
console.log('--------------------------------------------------------------')
const fs = require('fs')
const path = require('path')
const makeDir = require('make-dir');
const { walkSync } = require('./walkSync')
const { productTitleMatch } = require('../netlify/functions/productTitleMatch')
console.log('--------------------------------------------------------------')
let obj = {}
const website = process.env.WEBSITE

const keywords = require(`../subcategory-keywords/${website}/keywords.json`)
fs.rmSync(path.join(process.cwd(), `api/_files/data`), { recursive: true, force: true });

walkSync(path.join(process.cwd(), `data/${website}`), async (filepath) => {

    const dirName = path.dirname(filepath)
    const data = JSON.parse(fs.readFileSync(filepath))

    if (obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] === undefined) {
        obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] = [data]
    }
    obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] = [...obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")], data]


})
const uniqify = (array, key) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);

for (let o in obj) {
    const s = o.split('-').reverse()

    const marka = s[0]
    const data = obj[o]

    for (let d of data) {
        const { title } = d
            var machfound=false
        for (let k of keywords) {
         debugger
            const exactmatch = k.exact !== '' ? false : true
            const nws = k.exclude !== '' ? k.exclude.split(',') : []
            const match = productTitleMatch({ kw: k.keywords, exactmatch, nws, title })
            if (match) {
                const savePath = path.join(process.cwd(), `api/_files/data/${k.functionName}/${marka}.json`)
                if (fs.existsSync(savePath)) {
                    
                    const data = fs.readFileSync(savePath, { encoding: 'utf8' })
                    const dataObj =JSON.parse(data)
                    
                   fs.writeFileSync(savePath,JSON.stringify([...dataObj,d]))
                    
                }
                else {
                    
                    makeDir.sync(path.dirname(savePath))
                    fs.writeFileSync(savePath, JSON.stringify([d]) )
                    
                }

                machfound=true
            }
            else {
            
            }
        }

        if(machfound===false){

            const savePath = path.join(process.cwd(), `api/_files/data/diger/${marka}.json`)
            if (fs.existsSync(savePath)) {
                
                const data = fs.readFileSync(savePath, { encoding: 'utf8' })
                const dataObj =JSON.parse(data)
                
               fs.writeFileSync(savePath,JSON.stringify( [...dataObj,d]))
                
            }
            else {
                
                makeDir.sync(path.dirname(savePath))
                fs.writeFileSync(savePath, JSON.stringify([d]))
                
            }
        }
    }



    // const savePath = path.join(process.cwd(), `api/_files/data/${subcategory}/${marka}.json`)
    // makeDir.sync(path.dirname(savePath))

    // if (fs.existsSync(savePath)) {
    //     fs.unlinkSync(savePath)
    // }
    // const uniquedata = uniqify(data, 'imageUrl')
    // fs.writeFileSync(savePath, JSON.stringify(uniquedata))
}



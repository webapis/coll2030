
console.log('--------------------------------------------------------------')
const fs = require('fs')
const path = require('path')
const { walkSync } = require('./walkSync')
console.log('--------------------------------------------------------------')
    let obj = {}
    walkSync(path.join(process.cwd(), 'data'), (filepath) => {

        console.log('filepath',filepath)
        const dirName = path.dirname(filepath)
        // const data = JSON.parse(fs.readFileSync(filepath))
        // if (obj[dirName.replace(/[\\]/g, "-")] === undefined) {
        //     obj[dirName.replace(/[\\]/g, "-")] = [data]
        // }
        // obj[dirName.replace(/[\\]/g, "-")] = [...obj[dirName.replace(/[\\]/g, "-")], data]

    })
    // for (let o in obj) {
    //     const s = o.split('-').reverse()
    //     const marka = s[0]
    //     const subcategory = s[1]
    //     const project = s[2]
    //     const data = obj[o]
    //     fs.writeFileSync(`./api/_files/data/${subcategory}/${marka}.json`), JSON.stringify(data)
    //     debugger

    // }




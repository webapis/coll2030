
console.log('--------------------------------------------------------------')
const fs = require('fs')
const path = require('path')
const { walkSync } = require('./walkSync')
console.log('--------------------------------------------------------------')
    let obj = {}
    walkSync(path.join(process.cwd(), 'data'), (filepath) => {

      
        const dirName = path.dirname(filepath)
      
        const data = JSON.parse(fs.readFileSync(filepath))

        if (obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] === undefined) {
            obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] = [data]
        }
        obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] = [...obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")], data]

    })

    for (let o in obj) {
        const s = o.split('-').reverse()
        const marka = s[0]
        const subcategory = s[1]
        const project = s[2]
        const data = obj[o]
        console.log('s',s)
        console.log('data',data.length)
        console.log('marka',marka)
        console.log('subcategory',subcategory)
        console.log('project',project)
        const savePath =path.join(process.cwd(),`api/_files/data/${subcategory}/${marka}.json`)
        console.log('savePath',savePath)
        fs.writeFileSync(savePath, JSON.stringify(data))
        debugger

    }




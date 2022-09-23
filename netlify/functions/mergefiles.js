
console.log('--------------------------------------------------------------')
const fs = require('fs')
const path = require('path')
const makeDir = require('make-dir');
const { walkSync } = require('./walkSync')
console.log('--------------------------------------------------------------')
let obj = {}
walkSync(path.join(process.cwd(), 'data'), async (filepath) => {

    try {
        const dirName = path.dirname(filepath)
        //  console.log('filepath', filepath)

        const data = JSON.parse(fs.readFileSync(filepath))

        if (obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] === undefined) {
            obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] = [data]
        }
        obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] = [...obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")], data]
    } catch (error) {
        // console.log('filepath', filepath)
        console.log('error', error)
        debugger
    }


})
const uniqify = (array, key) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);
for (let o in obj) {
    const s = o.split('-').reverse()
    const marka = s[1]
    const subcategory = s[0]
    //  const project = s[4]
    const data = obj[o]
    // console.log('s', s)
    // console.log('data', data.length)
    // console.log('marka', marka)
    // console.log('subcategory', subcategory)
    // console.log('project', project)
    debugger
    const savePath = path.join(process.cwd(), `api/_files/data/${subcategory}/${marka}.json`)
    makeDir.sync(path.dirname(savePath))
    // console.log('savePath', savePath)
    if (fs.existsSync(savePath)) {
        fs.unlinkSync(savePath)
    }
   const  uniquedata =uniqify(data,'imageUrl')
    fs.writeFileSync(savePath, JSON.stringify(uniquedata))
    debugger

}




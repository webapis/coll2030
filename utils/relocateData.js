
console.log('--------------------------------------------------------------')
const fs = require('fs')
const path = require('path')
const makeDir = require('make-dir');
const { walkSync } = require('./walkSync')
console.log('--------------------------------------------------------------')

debugger
let obj = {}


walkSync(path.join(process.cwd(), 'old-data'), async (filepath) => {

    try {
        const data = JSON.parse(fs.readFileSync(filepath))

        for (let d of data) {
            if (fs.existsSync(d)) {
                fs.unlinkSync(d)
                console.log('deleted----', d)

            } else {
                console.log('file not found-----------------------', d)
            }

            debugger
        }


    } catch (error) {
        console.log('file deletion error', error)

        throw error
    }


})



walkSync(path.join(process.cwd(), 'collected-data'), async (filepath) => {

    try {

        const dirName = path.dirname(filepath)
        const filename = path.basename(filepath)
        const patharr = dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-").split('-').reverse()
        const marka = patharr[0]
        const subcategory = patharr[1]
        const project = patharr[2]
        console.log('filepath', filepath)
        await makeDir(`projects/${project}/data/${marka}/${subcategory}`)

        const savePath = path.join(process.cwd(), `projects/${project}/data/${marka}/${subcategory}/${filename}`)
        const data = JSON.parse(fs.readFileSync(filepath))
        if (fs.existsSync(savePath)) {
            fs.unlinkSync(savePath)
        }
        fs.writeFileSync(savePath, JSON.stringify(data))
        debugger
    } catch (error) {
        console.log('filepath', filepath)
        console.log('error', error)
        debugger
    }


})



// for (let o in obj) {
//     const s = o.split('-').reverse()
//     const marka = s[0]
//     const subcategory = s[1]
//     //  const project = s[4]
//     const data = obj[o]
//     // console.log('s', s)
//     // console.log('data', data.length)
//     // console.log('marka', marka)
//     // console.log('subcategory', subcategory)
//     // console.log('project', project)
//     debugger
//     const savePath = path.join(process.cwd(), `api/_files/data/${marka}/${subcategory}/${marka}.json`)
//     makeDir.sync(path.dirname(savePath))
//     // console.log('savePath', savePath)
//     if (fs.existsSync(savePath)) {
//         fs.unlinkSync(savePath)
//     }
//     fs.writeFileSync(savePath, JSON.stringify(data))
//     debugger

// }


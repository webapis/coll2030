
console.log('--------------------------------------------------------------')
const fs = require('fs')
const path = require('path')
const makeDir = require('make-dir');
const { walkSync } = require('./walkSync')
const {generateBrendReport}=require('./generateBrendReport')
console.log('--------------------------------------------------------------')

debugger
let obj = {}

// delete old data
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


// add newdata
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

// count all products data 


let total = 0
const date = new Date().toISOString()
walkSync(path.join(process.cwd(), `projects/dream/data`), async () => {

    try {
        total = total + 1
  

    } catch (error) {
        console.log('file deletion error', error)
debugger
        throw error
    }
})
const savePatha = path.join(process.cwd(), `projects/trends/src/total-products.json`)
if (fs.existsSync(savePatha)) {
debugger
    let data = JSON.parse(fs.readFileSync(savePatha,{encoding:'utf-8'}))
   
    //fs.unlinkSync(savePath)

    fs.writeFileSync(savePatha, JSON.stringify([...data,{date, total }]))
    debugger
} else {
    fs.writeFileSync(savePatha, JSON.stringify([{ date, total }]))
    debugger
}

//countAll products by brand

generateBrendReport()

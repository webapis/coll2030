
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
        const collectedData = JSON.parse(fs.readFileSync(filepath,{encoding:'utf-8'}))
        const patharr = dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-").split('-').reverse()
        const marka = patharr[2]

        debugger;
      
        for(let d of collectedData){
            const {imageUrl,subcategory }=d
            debugger
             makeDir.sync(`projects/dream/data/${marka}/${subcategory}`)
            debugger
            const fileName =imageUrl.replace(/[/]/g, '-').replace(/[.jpg]/g, '').replace(/[?]/, '').replace(/\[|\]|\,|&|=|:/g, '')
            debugger
            const savePath = path.join(process.cwd(), `projects/dream/data/${marka}/${subcategory}/${fileName}.json`)
            debugger
            fs.writeFileSync(savePath, JSON.stringify(d))
            debugger
        }
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

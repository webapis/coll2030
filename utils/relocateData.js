
console.log('--------------------------------------------------------------')
const fs = require('fs')
const path = require('path')
const makeDir = require('make-dir');
const { walkSync } = require('./walkSync')
// const { generateBrendReport } = require('./generateBrendReport')
// const { generateSubcategoryReport } = require('./generateSubcategoryReport')
const { generateUpdatedReport } = require('./report/generateUpdatedReport')
const { generateSubcategoryPie } = require('./generateSubcategoryPie')
console.log('--------------------------------------------------------------')


let obj = {}

// delete old data

if (fs.existsSync(path.join(process.cwd(), 'old-data'))) {
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
            
            //    throw error
        }
    })
}

// add newdata
if (fs.existsSync(path.join(process.cwd(), 'collected-data'))) {


    walkSync(path.join(process.cwd(), 'collected-data'), async (filepath) => {

        try {

            const collectedData = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))


            
            for (let d of collectedData) {
                const { imageUrl, subcategory, marka } = d

                makeDir.sync(`data/${marka}/${subcategory}`)

                const fileName = imageUrl.replace(/[/]/g, '-').replace(/[.jpg]/g, '').replace(/[?]/, '').replace(/\[|\]|\,|&|=|:/g, '')

                const savePath = path.join(process.cwd(), `data/${marka}/${subcategory}/${fileName}.json`)
                console.log('savePath------', savePath)
                
                fs.writeFileSync(savePath, JSON.stringify(d))
                

            }


        } catch (error) {
            console.log('filepath', filepath)
            console.log('error', error)
            
        }


    })
}
// add updateddata
if (fs.existsSync(path.join(process.cwd(), 'updated-data'))) {


    if (fs.existsSync(path.join(process.cwd(), 'updated-data'))) {
        walkSync(path.join(process.cwd(), 'updated-data'), async (filepath) => {
            try {
                const collectedData = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))
                for (let d of collectedData) {
                    const { imageUrl, subcategory, marka } = d
                    makeDir.sync(`data/${marka}/${subcategory}`)
                    const fileName = imageUrl.replace(/[/]/g, '-').replace(/[.jpg]/g, '').replace(/[?]/, '').replace(/\[|\]|\,|&|=|:/g, '')
                    const savePath = path.join(process.cwd(), `data/${marka}/${subcategory}/${fileName}.json`)
                    console.log('savePath------', savePath)
                    fs.writeFileSync(savePath, JSON.stringify(d))
                }
            } catch (error) {
                console.log('filepath', filepath)
                console.log('error', error)
                
            }


        })

    }

}
// count all products data 


// let total = 0
// const date = new Date().toISOString()
// walkSync(path.join(process.cwd(), `projects/dream/data`), async () => {

//     try {
//         total = total + 1


//     } catch (error) {
//         console.log('file deletion error', error)
//         
//         throw error
//     }
// })
// const savePatha = path.join(process.cwd(), `projects/trends/src/total-products.json`)
// if (fs.existsSync(savePatha)) {

//     let data = JSON.parse(fs.readFileSync(savePatha, { encoding: 'utf-8' }))



//     fs.writeFileSync(savePatha, JSON.stringify([...data, { date, total }]))

// } else {
//     fs.writeFileSync(savePatha, JSON.stringify([{ date, total }]))

// }

// //countAll products by brand

// generateBrendReport()
// generateSubcategoryReport()
// generateUpdatedReport()
// generateSubcategoryPie()
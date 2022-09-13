const { walkSync } = require('../walkSync')
const path = require('path')
const fs = require('fs')
const makeDir =require('make-dir')
function countTotal(dirpath, reportFilePath) {
    const folderPath = path.join(process.cwd(), `${dirpath}`)
if(fs.existsSync(folderPath)){


    let total = 0
    const date = new Date().toISOString()
    walkSync(folderPath, async (file) => {
        
        try {

            const data = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }))
            total = total + data.length

        } catch (error) {
            console.log('file deletion error', error)
            
            throw error
        }
    })
    const savePath = path.join(process.cwd(), `${reportFilePath}`)
    if (fs.existsSync(savePath)) {

        let data = JSON.parse(fs.readFileSync(savePath, { encoding: 'utf-8' }))
        debugger
      //  fs.writeFileSync(savePath, JSON.stringify([...data, { date, total }]))
        

    } else {
        
        fs.writeFileSync(savePath, JSON.stringify([{ date, total }]))
        
    }
}
}

function countTotalCollected(dirpath, reportFilePath) {
    const folderPath = path.join(process.cwd(), `${dirpath}`)
    if(fs.existsSync(folderPath)){
  
    let total = 0
    const date = new Date().toISOString()
    walkSync(folderPath, async () => {

        try {
            total = total + 1


        } catch (error) {
            console.log('file deletion error', error)
            
            throw error
        }
    })
    const savePatha = path.join(process.cwd(), `${reportFilePath}`)
    if (fs.existsSync(savePatha)) {

        let data = JSON.parse(fs.readFileSync(savePatha, { encoding: 'utf-8' }))



        fs.writeFileSync(savePatha, JSON.stringify([...data, { date, total }]))

    } else {
        fs.writeFileSync(savePatha, JSON.stringify([{ date, total }]))

    }
}
}


function countTotalCollectedByBrand(dirpath, reportFilePath){
    const dirs = fs.readdirSync(`${process.cwd()}/urls`)
    const folderPath = path.join(process.cwd(), `${dirpath}`)

    if(fs.existsSync(folderPath)){
    let markas = {}
    const date = new Date().toISOString()
    dirs.map(m => m.replace('.js', '')).map(m => {
        if (markas[m] === undefined) {

            markas[m] = { data: { [date]: 0 } }
        }

        return null
    })

    const reportPath = path.join(process.cwd(), `${reportFilePath}`)
    const reportexists = fs.existsSync(reportPath)
    if (reportexists) {
        const previousreport = JSON.parse(fs.readFileSync(reportPath, { encoding: 'utf-8' }))
        markas = previousreport
        dirs.map(m => m.replace('.js', '')).map(m => {
            if (markas[m] === undefined) {

                markas[m] = { data: { [date]: 0 } }
            }
            if (markas[m].data[date] === undefined) {
                markas[m] = { data: { ...markas[m].data, [date]: 0 } }
            }

            return null
        })
    } else {

        dirs.map(m => m.replace('.js', '')).map(m => {
            if (markas[m] === undefined) {

                markas[m] = { data: { [date]: 0 } }
            }
            if (markas[m].data[date] === undefined) {
                markas[m] = { data: { ...markas[m].data, [date]: 0 } }
            }
            return null
        })
    }
    

    walkSync(folderPath, (filepath) => {

        const fileName = filepath.replace(/[\\]/g, "-").replace(/[/]/g, "-").split('-')
        const marka = fileName[9]
    
        
        if(    markas[marka] ===undefined){

            markas[marka] = { data: { [date]: 0 } } 
        }
        markas[marka].data[date] = markas[marka].data[date] + 1


    })

    
    fs.writeFileSync(reportPath, JSON.stringify(markas))
    

}
}

function countTotalCollectedBySubcategory(dirpath, reportFilePath){

    const dirs = fs.readdirSync(`${process.cwd()}/urls`)
    
    const folderPath = path.join(process.cwd(), `${dirpath}`)
    if(fs.existsSync(folderPath)){
    const date = new Date().toISOString()
    const brandNames = dirs.map(m => m.replace('.js', ''))

    
    let markas = {}
    const reportPath = path.join(process.cwd(), `${reportFilePath}`)
    const reportexists = fs.existsSync(reportPath)
    if (reportexists) {
        const previousreport = JSON.parse(fs.readFileSync(reportPath, { encoding: 'utf-8' }))
        markas = previousreport
        for (let m of brandNames) {
            const current = require(`${process.cwd()}/urls/${m}`)
            const mappedurls = current.urls.map(m => m.subcategory).flat()
            const uniquedata = [...new Set(mappedurls)];
            const props = Object.assign({}, uniquedata.reduce((a, v) => ({ ...a, [v]: { data: { [date]: 0 } } }), {}))
            if (markas[m] === undefined) {
                markas[m] = {
                    ...props
                }
            }

        }
    } else {
        for (let m of brandNames) {
            const current = require(`${process.cwd()}/urls/${m}`)
            const mappedurls = current.urls.map(m => m.subcategory).flat()
            const uniquedata = [...new Set(mappedurls)];
            const props = Object.assign({}, uniquedata.reduce((a, v) => ({ ...a, [v]: { data: { [date]: 0 } } }), {}))
            if (markas[m] === undefined) {
                markas[m] = {
                    ...props
                }
            }

        }
    }
    

    walkSync(folderPath, (filepath) => {

        const fileName = filepath.replace(/[\\]/g, "-").replace(/[/]/g, "-").split('-')
        const marka = fileName[9]
        const subcategory = fileName[10]
        if (markas[marka][subcategory] === undefined) {
            markas[marka][subcategory] = { data: { [date]: 0 } }
        }
        if (markas[marka][subcategory].data === undefined) {
            markas[marka][subcategory].data = { [date]: 0 }
        }
        if (markas[marka][subcategory].data[date] === undefined) {
            markas[marka][subcategory].data[date] = 0
        }
        markas[marka][subcategory].data[date] = markas[marka][subcategory].data[date] + 1


    })

    
    fs.writeFileSync(reportPath, JSON.stringify(markas))
    

}
}

function countByBrand(dirpath, reportFilePath) {
    const dirs = fs.readdirSync('./urls')
    
    const folderPath = path.join(process.cwd(), `${dirpath}`)
    if(fs.existsSync(folderPath)){
    let markas = {}
    const date = new Date().toISOString()
    dirs.map(m => m.replace('.js', '')).map(m => {
        if (markas[m] === undefined) {

            markas[m] = { data: { [date]: 0 } }
        }

        return null
    })

    const reportPath = path.join(process.cwd(), `${reportFilePath}`)
    const reportexists = fs.existsSync(reportPath)
    if (reportexists) {
        const previousreport = JSON.parse(fs.readFileSync(reportPath, { encoding: 'utf-8' }))
        markas = previousreport
        dirs.map(m => m.replace('.js', '')).map(m => {
            if (markas[m] === undefined) {

                markas[m] = { data: { [date]: 0 } }
            }
            if (markas[m].data[date] === undefined) {
                markas[m] = { data: { ...markas[m].data, [date]: 0 } }
            }

            return null
        })
    } else {

        dirs.map(m => m.replace('.js', '')).map(m => {
            if (markas[m] === undefined) {

                markas[m] = { data: { [date]: 0 } }
            }
            if (markas[m].data[date] === undefined) {
                markas[m] = { data: { ...markas[m].data, [date]: 0 } }
            }
            return null
        })
    }
    

    walkSync(folderPath, (filepath) => {
        

        const data = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))

        data.forEach(d => {
            const { marka } = d
            
            if (markas[marka] === undefined) {

                markas[marka] = { data: { [date]: 0 } }
            }
            markas[marka].data[date] = markas[marka].data[date] + 1
        })
        



    })
    const savePath = path.join(process.cwd(), `${reportFilePath}`)
    
    fs.writeFileSync(savePath, JSON.stringify(markas))
    

}
}




function countByBrandDeleted(dirpath, reportFilePath) {
    const dirs = fs.readdirSync('./urls')
    const folderPath = path.join(process.cwd(), `${dirpath}`)

    if(fs.existsSync(folderPath)){
    let markas = {}
    const date = new Date().toISOString()
    dirs.map(m => m.replace('.js', '')).map(m => {
        if (markas[m] === undefined) {

            markas[m] = { data: { [date]: 0 } }
        }

        return null
    })

    const reportPath = path.join(process.cwd(), `${reportFilePath}`)
    const reportexists = fs.existsSync(reportPath)
    if (reportexists) {
        const previousreport = JSON.parse(fs.readFileSync(reportPath, { encoding: 'utf-8' }))
        markas = previousreport
        dirs.map(m => m.replace('.js', '')).map(m => {
            if (markas[m] === undefined) {

                markas[m] = { data: { [date]: 0 } }
            }
            if (markas[m].data[date] === undefined) {
                markas[m] = { data: { ...markas[m].data, [date]: 0 } }
            }

            return null
        })
    } else {

        dirs.map(m => m.replace('.js', '')).map(m => {
            if (markas[m] === undefined) {

                markas[m] = { data: { [date]: 0 } }
            }
            if (markas[m].data[date] === undefined) {
                markas[m] = { data: { ...markas[m].data, [date]: 0 } }
            }
            return null
        })
    }
    

    walkSync(folderPath, (filepath) => {
        
        const fileName = filepath.replace(/[\\]/g, "-").replace(/[/]/g, "-").split('-')
        const marka = fileName[8]
        
        const data = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))
        


        
        if (markas[marka] === undefined) {

            markas[marka] = { data: { [date]: data.length } }
        }
        markas[marka].data[date] = markas[marka].data[date] + data.length

        



    })
    const savePath = path.join(process.cwd(), `${reportFilePath}`)
    
    fs.writeFileSync(savePath, JSON.stringify(markas))
    
}
}


function countBySubcategory(dirpath, reportFilePath) {
    const dirs = fs.readdirSync(`${process.cwd()}/urls`)
    

    const folderPath = path.join(process.cwd(), `${dirpath}`)

    if(fs.existsSync(folderPath)){
    const date = new Date().toISOString()
    const brandNames = dirs.map(m => m.replace('.js', ''))

    
    let markas = {}
    const reportPath = path.join(process.cwd(), `${reportFilePath}`)
    const reportexists = fs.existsSync(reportPath)
    if (reportexists) {
        const previousreport = JSON.parse(fs.readFileSync(reportPath, { encoding: 'utf-8' }))
        markas = previousreport
        for (let m of brandNames) {
            const current = require(`${process.cwd()}/urls/${m}`)
            const mappedurls = current.urls.map(m => m.subcategory).flat()
            const uniquedata = [...new Set(mappedurls)];
            const props = Object.assign({}, uniquedata.reduce((a, v) => ({ ...a, [v]: { data: { [date]: 0 } } }), {}))
            if (markas[m] === undefined) {
                markas[m] = {
                    ...props
                }
            }

        }
    } else {
        for (let m of brandNames) {
            const current = require(`${process.cwd()}/urls/${m}`)
            const mappedurls = current.urls.map(m => m.subcategory).flat()
            const uniquedata = [...new Set(mappedurls)];
            const props = Object.assign({}, uniquedata.reduce((a, v) => ({ ...a, [v]: { data: { [date]: 0 } } }), {}))
            if (markas[m] === undefined) {
                markas[m] = {
                    ...props
                }
            }

        }
    }
    

    walkSync(folderPath, (filepath) => {
        
        const data = JSON.parse(fs.readFileSync(filepath))

        
        data.forEach(d => {
            
            const { marka, subcategory } = d
            
            if (markas[marka][subcategory] === undefined) {
                markas[marka][subcategory] = { data: { [date]: 0 } }
            }
            if (markas[marka][subcategory].data === undefined) {
                markas[marka][subcategory].data = { [date]: 0 }
            }
            if (markas[marka][subcategory].data[date] === undefined) {
                markas[marka][subcategory].data[date] = 0
            }
            
            markas[marka][subcategory].data[date] = markas[marka][subcategory].data[date] + 1
            
        })

        
    })

    
    fs.writeFileSync(reportPath, JSON.stringify(markas))
    
}
}


function countBySubcategoryDeleted(dirpath, reportFilePath) {
    const dirs = fs.readdirSync(`${process.cwd()}/urls`)
    const date = new Date().toISOString()
    const brandNames = dirs.map(m => m.replace('.js', ''))
    const folderPath = path.join(process.cwd(), `${dirpath}`)
    if(fs.existsSync(folderPath)){
    
    let markas = {}
    const reportPath = path.join(process.cwd(), `${reportFilePath}`)
    const reportexists = fs.existsSync(reportPath)
    if (reportexists) {
        const previousreport = JSON.parse(fs.readFileSync(reportPath, { encoding: 'utf-8' }))
        markas = previousreport
        for (let m of brandNames) {
            const current = require(`${process.cwd()}/urls/${m}`)
            const mappedurls = current.urls.map(m => m.subcategory).flat()
            const uniquedata = [...new Set(mappedurls)];
            const props = Object.assign({}, uniquedata.reduce((a, v) => ({ ...a, [v]: { data: { [date]: 0 } } }), {}))
            if (markas[m] === undefined) {
                markas[m] = {
                    ...props
                }
            }

        }
    } else {
        for (let m of brandNames) {
            const current = require(`${process.cwd()}/urls/${m}`)
            const mappedurls = current.urls.map(m => m.subcategory).flat()
            const uniquedata = [...new Set(mappedurls)];
            const props = Object.assign({}, uniquedata.reduce((a, v) => ({ ...a, [v]: { data: { [date]: 0 } } }), {}))
            if (markas[m] === undefined) {
                markas[m] = {
                    ...props
                }
            }

        }
    }
    

    walkSync(folderPath, (filepath) => {

        const fileName = filepath.replace(/[\\]/g, "-").replace(/[/]/g, "-").split('-')

        const marka = fileName[8]
        
        const data = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf-8' }))

        data.forEach(d => {
            const fileName = d.replace(/[\\]/g, "-").replace(/[/]/g, "-").split('-')
            const subcategory = fileName[4]
            
            if(markas[marka]===undefined){
                markas[marka]={}
            }
            if (markas[marka][subcategory] === undefined) {
                markas[marka][subcategory] = { data: { [date]: 0 } }
            }
            if (markas[marka][subcategory].data === undefined) {
                markas[marka][subcategory].data = { [date]: 0 }
            }
            if (markas[marka][subcategory].data[date] === undefined) {
                markas[marka][subcategory].data[date] = 0
            }
            markas[marka][subcategory].data[date] = markas[marka][subcategory].data[date] + 1
        })



    })

    
    fs.writeFileSync(reportPath, JSON.stringify(markas))
    

}
}



module.exports = { countTotal, countByBrand, countByBrandDeleted, countBySubcategory, countBySubcategoryDeleted, countTotalCollected,countTotalCollectedByBrand,countTotalCollectedBySubcategory }
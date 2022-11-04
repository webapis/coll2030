require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { walkSync } = require('./utils/walkSync')
const dirpath = `data/${process.env.WEBSITE}`
const reportPath = path.join(`${process.cwd()}`, `projects/trends/public/reports/total-collected-by-brand-bar.json`)
const previousreport = JSON.parse(fs.readFileSync(path.join(`${process.cwd()}`, `projects/trends/public/reports/total-collected-by-brand-bar.json`), { encoding: 'utf-8' }))
debugger
const dirs = fs.readdirSync(`${process.cwd()}/urls/${process.env.WEBSITE}`)
debugger
const folderPath = path.join(process.cwd(), `${dirpath}`)
const date = new Date().toISOString()
debugger
if (fs.existsSync(folderPath)) {
    let markas = {}

    walkSync(folderPath, (filepath) => {

        const fileName = filepath.replace(/[\\]/g, "-").replace(/[/]/g, "-").split('-')
        const marka = fileName[8]

        if (markas[marka] === undefined) {

            markas[marka] = { data: { count: 0 } }
        }
        markas[marka].data.count = markas[marka].data.count + 1

    })
    for (let m of dirs) {
        const current = m.replace('.js', '')
        debugger



        const obj = markas[current]
        console.log('obj', obj, current)
        if (obj) {
            const exists = previousreport.length > 0 && previousreport.find(f => f.title === current)
            if (exists) {
                exists.data = [...exists.data, { date, total: obj.data.count }]

            } else {
                previousreport.push({ title: current, data: [{ date, total: obj.data.count }] })
                debugger
            }

        }else{
            const exists = previousreport.length > 0 && previousreport.find(f => f.title === current)
            if (exists) {
                exists.data = [...exists.data, { date, total: 0 }]

            } else {
                previousreport.push({ title: current, data: [{ date, total: 0 }] })
                debugger
            } 
        }



        debugger

    }

    fs.writeFileSync(reportPath, JSON.stringify(previousreport))


}

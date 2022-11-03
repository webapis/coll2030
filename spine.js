const keywords = require(`${process.cwd()}/api/_files/nav/keywords.json`)
const fs = require('fs')
const categories = keywords.filter(f => f.keywordType === 'category')
const categoriesCallected = Object.values(require(`${process.cwd()}/src/category-nav-counter.json`)).flat()
const previousreport = require(`${process.cwd()}/projects/trends/public/reports/collected-subcategory-pie.json`)
const date = new Date().toISOString()
debugger




const updatedReport = [...previousreport,{data:categoriesCallected,date}]
debugger
fs.unlinkSync('./projects/trends/public/reports/collected-subcategory-pie.json')
fs.writeFileSync('./projects/trends/public/reports/collected-subcategory-pie.json', JSON.stringify(updatedReport))

debugger



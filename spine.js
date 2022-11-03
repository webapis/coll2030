// const keywords = require(`${process.cwd()}/api/_files/nav/keywords.json`)
const fs = require('fs')
// const categories = keywords.filter(f => f.keywordType === 'category')
// const categoriesCallected = Object.values(require(`${process.cwd()}/src/category-nav-counter.json`)).flat()
// const previousreport = require(`${process.cwd()}/projects/trends/public/reports/collected-subcategory-pie.json`)
// const date = new Date().toISOString()
// debugger




// const updatedReport = [...previousreport,categoriesCallected]
// debugger
// fs.unlinkSync('./projects/trends/public/reports/collected-subcategory-pie.json')
// fs.writeFileSync('./projects/trends/public/reports/collected-subcategory-pie.json', JSON.stringify(updatedReport))

// debugger



const keywords = require(`${process.cwd()}/api/_files/nav/keywords.json`)

const categories = keywords.filter(f => f.keywordType === 'category')
const categoriesCallected = Object.values(require(`${process.cwd()}/src/category-nav-counter.json`)).flat()
const previousreport = require(`${process.cwd()}/projects/trends/public/reports/total-collected-by-subcategory.json`)
const date = new Date().toISOString()
debugger
for (let cat of categories) {
  if (cat.title === 'sd') {
    debugger
  }
  let count = categoriesCallected.find(f => f.title === cat.title).count
  let precountExist = previousreport.find(f => f.title === cat.title)
  //previously counted and last time also counted
  if (precountExist && count) {

    precountExist.data = [...precountExist.data, { date, total: count }]
  }
  //first time count counted
  else if (!precountExist && count) {

    previousreport.push({ data: [{ date, total: count }], title: cat.title })
  }
  //counting missed
  else if (precountExist && !count) {

    precountExist.data = [...precountExist.data, { date, total: 0 }]
  }
  if (!precountExist && !count) {
    previousreport.push({ data: [{ date, total: 0 }], title: cat.title })
  }


}



const updatedReport = previousreport
debugger
fs.unlinkSync('./projects/trends/public/reports/total-collected-by-subcategory.json')
fs.writeFileSync('./projects/trends/public/reports/total-collected-by-subcategory.json', JSON.stringify(updatedReport))

debugger

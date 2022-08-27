

const fs = require('fs')
const path = require('path')
const { walkSync } = require('./utils/walkSync')
let obj = {}
walkSync(path.join(process.cwd(), 'data'), (filepath) => {

  const dirName = path.dirname(filepath)
  const data = JSON.parse(fs.readFileSync(filepath))
  if (obj[dirName.replace(/[\\]/g, "-")] === undefined) {
    obj[dirName.replace(/[\\]/g, "-")] = [data]
  }
  obj[dirName.replace(/[\\]/g, "-")] = [...obj[dirName.replace(/[\\]/g, "-")], data]

})

for (let o in obj) {
  const s = o.split('-').reverse()
  const marka = s[0]
  const subcategory = s[1]
  const project = s[2]
  const data = obj[o]
  fs.writeFileSync(path.join(process.cwd(), `projects/${project}/api/_files/data/${subcategory}/${marka}.json`), JSON.stringify(data))
  debugger

}



// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const fs = require('fs')
// const html = fs.readFileSync('./htmls/joinus.html').toString()
// const dom = new JSDOM(html)

// debugger;

// const list = Array.from(dom.window.document.querySelectorAll('[data-json-product]'))
// debugger;
// const prods = list.map(element => {
// debugger;
//   const obj =JSON.parse(element.getAttribute('data-json-product'))
// debugger;
//  // const title = element.querySelector('.lazy-image.product-name.track-link').getAttribute('title')
//  // const img= element.querySelector('.lazy-image.product-name.track-link img').src
//  // const priceNew =element.querySelector('.product-price')?element.querySelector('.product-price').innerHTML.replace('TL','').trim() :element.querySelector('.product-new-price').innerHTML.replace('TL','').trim()
// //  const link = element.querySelector('.lazy-image.product-name.track-link').href

//   return {
//    // title,
//   //  priceNew,
//    // imageUrl: img,
//    // link,
//     timestamp: Date.now(),
//     marka: 'joinus',

//   }
// })

// debugger;
// let products = []







































(async () => {
  //require('dotenv').config()
  const data = require('./000000001.json')

  const Apify = require('apify');
  debugger
  const dataset = await Apify.openDataset();
  const { items } = await dataset.getData()
  debugger
  const map = items.map(m => {

    return [...m.groups]
  }).map(m => {


    return [...m]
  }).map((m) => {

    return m[0].garments
  }).map(m => {


    return Object.values(m)
  }).flat().map(m => {

    return [m.colors.map(c => {

      return { shortDescription: m.shortDescription, ...c }
    })]
  }).flat(2).map(m => {
    const imageUrl =m.images[0].img1Src
    const link =m.linkAnchor
    return {
      title: 'mango ' + m.shortDescription +' '+m.label,
      priceNew:m.price.salePrice.replace('TL','').trim(),

      imageUrl:imageUrl.substring(imageUrl.indexOf('https://st.mngbcn.com/')+22),
      link:link.substring(link.indexOf('/')+1),
      timestamp: Date.now(),
      marka: 'mango',
    }
  })
  debugger
})()














































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







































(async () => {
  //require('dotenv').config()


  const Apify = require('apify');
  debugger
  const dataset = await Apify.openDataset();
  const { items } = await dataset.getData()
  debugger
  const map = items.filter(f => f.productGroups).map(m => [...m.productGroups]).flat().map(m => {

    return [...m.elements]
  }).flat().filter(f => f.commercialComponents).map(m => [...m.commercialComponents]).flat().map(c => {

    return {
      ...c, detail: {
        ...c.detail, colors: c.detail.colors.map(m => {
          const imageUrl =m.xmedia[0].path +'/w/315/'+m.xmedia[0].name+'.jpg?ts='+m.xmedia[0].timestamp
          const link =c.seo.keyword+'-p'+c.seo.seoProductId+'.html'
          const price =m.price.toString().length===5 ? m.price.toString().substring(0,3)+','+ m.price.toString().substring(3): (m.price.toString().length===6? m.price.toString().charAt(0)+'.'+m.price.toString().substring(1,4)+',00'  :null)
    
          return {
            ...m, title: c.name + ' ' + m.name, priceNew:price, imageUrl,link

          }
        })
      }
    }
  }).map(m=>{
    return [...m.detail.colors]

  }).flat().map(m=>{
    return {title:m.title,priceNew:m.priceNew,imageUrl:m.imageUrl,link:m.link}
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




































//require('dotenv').config()


const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const html = fs.readFileSync('./htmls/baqa.html').toString()
const dom = new JSDOM(html)

debugger;

const list = Array.from(dom.window.document.querySelectorAll(".ItemOrj.col-3"))

const prods = list.map(element => {

  const img = element.querySelector('[data-original]').getAttribute('data-original')
  const title = element.querySelector('.productName.detailUrl a').innerHTML
  const priceNew =element.querySelector('.discountPrice span').innerHTML.replace('₺', '').trim()
  const link = element.querySelector('.detailLink.detailUrl').href
  return {
    title,
    priceNew,
    imageUrl: img,
    link,
    timestamp: Date.now(),
    marka: 'baqa',

  }
})

debugger;
let products = []


















/*
list.forEach(element => {

  const links =Array.from (element.querySelectorAll('a.product-link.product-grid-product__link.link')).map((m)=>m.href)
  const images =Array.from(element.querySelectorAll('img.media-image__image.media__wrapper--media')).map((m)=>m.src)
  const titles =Array.from(element.querySelectorAll('img.media-image__image.media__wrapper--media')).map((m)=>m.alt)
  const prices =Array.from( element.querySelectorAll('.price-current__amount')).map((m)=>m.textContent.replace("TL",''))
  
  
  const items=links.map((m,i)=>{
  return { title:titles[i],
    
    priceNew:prices[i],
    imageUrl: images[i],
    link:links[i],
    timestamp: Date.now(),
    marka: 'zara',
    // subcategory: _subcategory,
    // category: _category
  }
})

products.push(...items)
})
debugger;
// const reduce = list.reduce((p,c,i,arr)=>{
//     debugger;
// const classList =c.className.split(' ').map((c,i)=> '.'+c).join('')
//   const uls=  dom.window.document.querySelector(".product-grid-block-dynamic.product-grid-block-dynamic__container.product-grid-block-dynamic__container--1A").childNodes
//     debugger;
// },[])
*/
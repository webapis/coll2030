//require('dotenv').config()


const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const html = fs.readFileSync('./htmls/adidas.html').toString()
const dom = new JSDOM(html)

debugger;

const list = Array.from(dom.window.document.querySelectorAll(".grid-item"))

const prods = list.map(element => {

  const img = element.querySelector('.glass-product-card__assets-link img').srcset.split('w,')[5].replace('\n', '').replace('766w', '').trim()
  const title = element.querySelector('.glass-product-card__assets-link img').alt
  const priceNew =element.querySelector('[ data-auto-id="gl-price-item"] div')&& element.querySelector('[ data-auto-id="gl-price-item"] div').innerHTML.replace('TL', '').trim()
  const link = element.querySelector('[data-auto-id="glass-hockeycard-link"]').href
  return {
    title,
    priceNew,
    imageUrl: img,
    link,
    timestamp: Date.now(),
    marka: 'adidas',

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
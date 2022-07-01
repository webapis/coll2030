//require('dotenv').config()





const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const html = fs.readFileSync('./htmls/fullamoda.html').toString()
const dom = new JSDOM(html)

debugger;

const list = Array.from(dom.window.document.querySelectorAll('.productItemLayout'))
debugger;
const prods = list.map(element => {
  const title = element.querySelector('img[title]').getAttribute('title')
  const img = element.querySelector('img[title]').src
  const priceNew = element.querySelector('.discountFlashPrice').textContent.replace('TL', '').trim()
  const link = element.querySelector('img[title]').parentElement.href
  return {
    title,
    priceNew,
    imageUrl: img,
    link,
    timestamp: Date.now(),
    marka: 'fullamoda',
  }
})

debugger;
let products = []







/*
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const html = fs.readFileSync('./htmls/faststep.html').toString()
const dom = new JSDOM(html)

debugger;

const list = Array.from(dom.window.document.querySelectorAll('.product-layout'))
debugger;
const prods = list.map(element => {
  const title = element.querySelector('.image a.product-img img').alt.trim()
  const img= element.querySelectorAll('.image a.product-img img')[0].getAttribute('data-srcset').split('x,')[1].replace('2x','').trim()
  const priceNew =element.querySelector('.price-tax')?element.querySelector('.price-tax').textContent.replace('TL','').replace('SEPETTE','').trim(): element.querySelector('.price-normal').innerHTML.replace('TL','')
  const link = element.querySelector('.image a.product-img').href
  return {
   title,
    priceNew,
    imageUrl: img,
    link,
    timestamp: Date.now(),
    marka: 'dagi',
  }
})

debugger;
let products = []



*/


















/*
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const html = fs.readFileSync('./htmls/dagi.html').toString()
const dom = new JSDOM(html)

debugger;

const list = Array.from(dom.window.document.querySelectorAll('.item.product.product-item'))
debugger;
const prods = list.map(element => {
  const title = element.querySelector('.product-image-photo').alt
  const img= element.querySelector('.product-image-photo').src
  const priceNew =element.querySelector('.special-price span')?element.querySelector('.special-price span').innerHTML.replace('₺',''): element.querySelector('.price.parent').innerHTML.replace('₺','')
  const link = element.querySelector('.product.photo.product-item-photo').href
  return {
    title,
    priceNew,
    imageUrl: img,
    link,
    timestamp: Date.now(),
    marka: 'dagi',
  }
})

debugger;
let products = []

*/








/*
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const html = fs.readFileSync('./htmls/colins.html').toString()
const dom = new JSDOM(html)

debugger;

const list = Array.from(dom.window.document.querySelectorAll('.productbox.clearfix.list-item'))
debugger;
const prods = list.map(element => {

  const title = element.querySelector('.lazy-image.product-name.track-link').getAttribute('title')
  const img= element.querySelector('.lazy-image.product-name.track-link img').src
  const priceNew =element.querySelector('.product-price')?element.querySelector('.product-price').innerHTML.replace('TL','').trim() :element.querySelector('.product-new-price').innerHTML.replace('TL','').trim()
  const link = element.querySelector('.lazy-image.product-name.track-link').href

  return {
    title,
    priceNew,
    imageUrl: img,
    link,
    timestamp: Date.now(),
    marka: 'butigo',

  }
})

debugger;
let products = []


*/
















/*
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')
const html = fs.readFileSync('./htmls/butigo.html').toString()
const dom = new JSDOM(html)

debugger;

const list = Array.from(dom.window.document.querySelectorAll("[data-gtm-product]"))
debugger;
const prods = list.map(element => {
   const obj = JSON.parse(element.getAttribute('data-gtm-product'))

  const img = element.querySelector('[data-src]').getAttribute('data-src')
  const title = obj.name
  const priceNew =obj.price
  const link = obj.url
  return {
    title,
    priceNew,
    imageUrl: img,
    link,
    timestamp: Date.now(),
    marka: 'butigo',

  }
})

debugger;
let products = []
*/

















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
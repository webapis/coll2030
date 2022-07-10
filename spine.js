//require('dotenv').config()
const data =require('./api/_files/kadin/data.json')
const kw ='deri ^'
const elbiseler =data.filter(f=>f.subcategory==='elbise' && f.title !=='')//.filter((f,i)=>i<5)
let tree={}
let mcd=[]
 elbiseler.map(m=>m.title).map((title,i)=>{
console.log('title',title)
  try {
    const match =kw.replace('^','').replace(/\s/g,',').split(',').every(function(keyword){
    const fullmatch = kw.indexOf('^')!==-1

    if(fullmatch){
    return   title.toLowerCase().replace(/\s/g,',').split(',').filter(f=> f===keyword).length>0
    }else{
    return   title.toLowerCase().replace(/\s/g,',').split(',').filter(f=> f===keyword || f.indexOf(keyword)===0  ).length>0
    }
  

 
  })




  if(match){
    mcd.push(title)
    const rd=  tree[`${kw}`] ===undefined? tree[`${kw}`]=1:tree[`${kw}`]=tree[`${kw}`]+1
  }
  } catch (error) {
    debugger
  }
})
debugger;




















































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




































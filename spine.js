//require('dotenv').config()



const data =require('./api/_files/kadin/data.json')
const elbiseler =data.filter(f=>f.subcategory==='elbise')//.filter((f,i)=>i<5)
const {keywords} =require('./keywords/elbise')

let tree={}
let mcd=[]
debugger
const kwtree= elbiseler.map(m=>m.title).map((title,i)=>{

console.log('title',title)
if(title){

  keywords.forEach(kw=>{
    const match =kw.split(' ').every(function(k){
        let found =title.toLowerCase().trim().split(' ').filter(f=>f!=='').filter(f=> kw.includes(f))
        let kwr=kw.split(' ')
        if(found.length===kwr.length){
      
        }

      return title.toLowerCase().includes(k) | found.length===kwr.length
    
    })

    if(match){
   
      mcd.push(title)

      const rd=  tree[`${kw}`] ===undefined? tree[`${kw}`]=1:tree[`${kw}`]=tree[`${kw}`]+1
   
    }
  })

}




})
//const product='Kemik Mert Aslan Dantelli Uzun Kollu Midi Boy Elbise'.toLowerCase()
//const keywordss ='midi dantelli elbise'.toLowerCase().split(' ')

//const result =keywordss.every(function(k){
//  return product.includes(k) || product.split(' ').find(f=> keywordss.includes(f))
//})

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




































const fs=require('fs')
var TAFFY = require( 'taffy' );
const data = require('./api/_files/kadin/data.json')
debugger;

const groupByCategory = data.sort((a, b) => (a.subcategory > b.subcategory) ? 1 : -1).reduce((group, product) => {
    const {  marka } = product;
    group[marka] = group[marka] ?? [];
    group[marka].push(product);
    return group;
}, {});
const orderedByMarka = []
for (let g in groupByCategory) {
    const current = groupByCategory[g]
    orderedByMarka.push(...current.map((c, i) => { return { ...c, itemOrder: i } }))

   
}


 const ordereditemOrder=orderedByMarka.sort((a, b) => (a.itemOrder > b.itemOrder) ? 1 : -1)
 debugger;
 const data =require('./api/_files/kadin/data.json')
 var products = TAFFY(data);
     products.merge(ordereditemOrder,"imageUrl")
 const mergedData =products().get()
 
debugger;
 //save data to jsson
 fs.unlinkSync(`./api/_files/kadin/data.json`)
 fs.appendFileSync(`./api/_files/kadin/data.json`, JSON.stringify(mergedData))


 console.log('items.length', ordereditemOrder.length)
// const groupByCategory = data.sort((a, b) => (a.subcategory > b.subcategory) ? 1 : -1).map((c,i,arr)=>{
//     const filterByMarka =arr.filter(f=>f.marka===c.marka)
//     const itemOrder =filterByMarka.findIndex(i=>i.imageUrl===c.imageUrl)

//  return {...c,itemOrder}

// })


debugger;

/*.reduce((group, product) => {
    const { subcategory,marka } = product;
    group[marka] = group[marka] ?? [];
    group[marka].push(product);
    return group;
}, {});
*/
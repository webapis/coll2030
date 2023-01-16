
(async()=>{
    const Apify = require('apify');

    const productsDataset = await Apify.openDataset(`products`);
    const { items: productItems } = await productsDataset.getData();
    
productItems.forEach(f=>{
    console.log('f',f)
})
})()

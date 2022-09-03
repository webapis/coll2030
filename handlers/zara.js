const Apify = require('apify');
async function handler(page, context) {
    const { request: { userData: { subcategory, category, start,node } } } = context

    const url = await page.url()
    await page.waitForSelector('.product-grid-block-dynamic.product-grid-block-dynamic__container')
    const dataset = await Apify.openDataset();
    await page.evaluate(async () => {
        var totalHeight = 0;
        var distance = 100;
        let inc = 0
        window.scrollBy(0, distance);
        totalHeight += distance;
        inc = inc + 1
    });

    await page.waitFor(5000)
    const { items } = await dataset.getData()
    const data = items.filter(f => f.productGroups).map(m => [...m.productGroups]).flat().map(m => {

        return [...m.elements]
    }).flat().filter(f => f.commercialComponents).map(m => [...m.commercialComponents]).flat().map(c => {

        return {
            ...c, detail: {
              ...c.detail, colors: c.detail.colors.map(m => {
                const imageUrl =m.xmedia[0].path +'/w/315/'+m.xmedia[0].name+'.jpg?ts='+m.xmedia[0].timestamp
                const link =c.seo.keyword+'-p'+c.seo.seoProductId+'.html'
                const price =m.price.toString().length===5 ? m.price.toString().substring(0,3)+','+ m.price.toString().substring(3): (m.price.toString().length===6? m.price.toString().charAt(0)+'.'+m.price.toString().substring(1,4)+',00'  :null)
          
                return {
                  ...m, title: "zara "+ c.name + ' ' + m.name, priceNew:price, imageUrl,link
      
                }
              })
            }
          }
    }).map(m => {
        return [...m.detail.colors]

    }).flat().map(m => {
        return {
            title: m.title, priceNew: m.priceNew, imageUrl: m.imageUrl, link: m.link, category, timestamp: Date.now(),
            marka: "zara",node
        }
    })
    // debugger;

    console.log('data length_____', data.length, 'url:', url)


    const withSub = data.map(m => {
        const { title } = m
        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[subcategory.length-1]
        debugger
        return { ...m, subcategory: subcat,title:title.replace(/İ/g,'i').toLowerCase() }
    })
    return withSub
}

async function getUrls(page) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}


module.exports = { handler, getUrls }


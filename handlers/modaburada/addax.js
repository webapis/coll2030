

const Apify = require('apify');
async function handler(page, context) {
    const { request: { userData: { subcategory, category, start, opts,node } } } = context
    debugger;


    const url = await page.url()

    debugger;

    await page.waitForSelector('.PrdContainer')
    await autoScroll(page);
    const dataset = await Apify.openDataset();
    const { items } = await dataset.getData()
    debugger
    const data = await page.$$eval('.Prd', (productCards, _subcategory, _category, _opts,_node) => {
        return productCards.map(productCard => {
            const priceNew = productCard.querySelector('.PPrice').innerHTML.replace('TL', '').trim()//.replace(',','.')
            const longlink = productCard.querySelector('a[data-product').href
            const link = longlink.substring(longlink.indexOf("https://www.addax.com.tr/") + 25)
            const longImgUrl = productCard.querySelector("img[data-src]").getAttribute('data-src')
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://cdn2.sorsware.com/") + 26)
            const title = productCard.querySelector("img[data-src]").alt
            return {
                title: 'addax ' + title.replace(/İ/g,'i').toLowerCase(),
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'addax',
               // subcategory: _subcategory,
                category: _category,
                node: _node
            }
        })
    }, subcategory, category, opts,node)



    //----------

    console.log('data length_____', data.length, 'url:', url)


    const withSub = data.map(m => {
        const { title } = m
        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[subcategory.length-1]
     
        return { ...m, subcategory: subcat }
    })
    return withSub
}

async function getUrls(page) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}

async function autoScroll(page) {
    await page.evaluate(async () => {


        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            let inc = 0
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;
                inc = inc + 1
                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 150);
        });
    });
}
module.exports = { handler, getUrls }

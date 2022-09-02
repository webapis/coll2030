
async function handler(page, context) {
    const { request: { userData: { subcategory, category,node } } } = context
    debugger;
    const url = await page.url()

    await page.waitForSelector('.product-list-grid')
await autoScroll(page)
    const data = await page.$$eval('[data-category-name]', (productCards, _subcategory, _category,_node) => {
        return productCards.map(productCard => {
            const priceNew = productCard.querySelector('.urunListe_satisFiyat').innerHTML.replace('₺', '').trim()
            const longlink = productCard.querySelector('.prd-lnk').href
            const link = longlink.substring(longlink.indexOf("https://www.twist.com.tr/") + 25)
            const longImgUrl =  productCard.querySelector('[data-background]') ? productCard.querySelector('[data-background]').getAttribute('data-background') : productCard.querySelector('[data-image-src]').getAttribute('data-image-src')
           const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://img2-twist.mncdn.com/") + 29)
            const title =  productCard.querySelector('.prd-name').textContent.replace(/\n/g, '').trim()

            return {
                title: 'twist '+title,
                priceNew,//:priceNew.replace('.','').replace(',','.').trim(),
                imageUrl:imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'twist',
                //subcategory: _subcategory,
                category: _category,
                node: _node
            }
        }).filter(f => f.imageUrl !== null)
    }, subcategory, category,node)

    console.log('data length_____', data.length, 'url:', url)


    const withSub = data.map(m => {
        const { title } = m
        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[0]
        debugger
        return { ...m, subcategory: subcat }
    })
    return withSub
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
async function getUrls(page) {

    const pageUrls = []

 

    return { pageUrls, productCount:0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
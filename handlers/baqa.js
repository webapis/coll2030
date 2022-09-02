
async function handler(page, context) {
    const { request: { userData: { subcategory, category, node } } } = context

    const url = await page.url()

    await page.waitForSelector('#ProductPageProductList')
    await autoScroll(page)
    debugger;
    const data = await page.$$eval('.ItemOrj.col-3', (productCards, _subcategory, _category, _node) => {
        return productCards.map(productCard => {
            const longimg = productCard.querySelector('[data-original]').getAttribute('data-original')
            const title = productCard.querySelector('.productName.detailUrl a').innerHTML
            const priceNew = productCard.querySelector('.discountPrice span').innerHTML.replace('₺', '')//.replace('.','').replace(',','.')
            const link = productCard.querySelector('.detailLink.detailUrl').href

            return {
                title: 'baqa ' + title,
                priceNew,
                imageUrl: longimg,
                link: link.substring(link.indexOf('https://www.baqa.com.tr/') + 24),
                timestamp: Date.now(),
                marka: 'baqa',
             //   subcategory: _subcategory,
                category: _category,
                node: _node
            }
        })//.filter(f => f.priceNew !== null)
    }, subcategory, category, node)

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
            }, 100);
        });
    });
}
async function getUrls(page) {

    const pageUrls = []



    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
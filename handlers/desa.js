
async function handler(page, context) {
    const { request: { userData: { subcategory, category, opts } } } = context

    const url = await page.url()

    await page.waitForSelector('.products')
    // onetrust-accept-btn-handler

    await manualScroll(page)

    return new Promise((resolve, reject) => {
        try {

            let inv = setInterval(async () => {

       
                const collected = await page.evaluate(() => document.querySelectorAll('.products li').length)

                console.log('collected', collected)
           
                const loadmorebtn = await page.$('.load-more-products')
                if (loadmorebtn) {
                    await page.click('.load-more-products')
                   await manualScroll(page)
                }
                else {
                    clearInterval(inv)

                    const data = await page.$$eval('.products li', (productCards, _subcategory, _category, _opts) => {
                        return productCards.map(productCard => {
                            // const priceNew = productCard.querySelector("span[data-price]") ? productCard.querySelector("span[data-price]").getAttribute('data-price').replace(/\n/g, '').trim().replace('₺', '').replace('TL', '').trim() : productCard.outerHTML
                            // const longlink = productCard.querySelector('.product-link') ? productCard.querySelector('.product-link').getAttribute('data-purehref') : productCard.outerHTML
                            // const link = longlink.substring(longlink.indexOf("/") + 1)
                            // const longImgUrl = productCard.querySelector('.product-list-image') ? productCard.querySelector('.product-list-image').src : productCard.outerHTML
                            // const imageUrlshort = longImgUrl && longImgUrl.substring(longImgUrl.indexOf('https://www.abiyefon.com/') + 25)
                            const title = productCard.querySelector(".img-options img") ? productCard.querySelector(".img-options img").alt : productCard.outerHTML
                            return {
                                title: 'desa ' + title + (_opts.keyword ? (title.toLowerCase().includes(_opts.keyword) ? '' : ' ' + _opts.keyword) : ''),
                                priceNew,
                                imageUrl: imageUrlshort,
                                link,
                                timestamp: Date.now(),
                                marka: 'desa',
                                subcategory: _subcategory,
                                category: _category
                            }
                        }).filter(f => f.imageUrl !== null)
                    }, subcategory, category, opts)


                    console.log('data length_____', data.length, 'url:', url)
                    debugger

                    return resolve(data)

                }

            }, 150)
            // clearInterval(inv)
        } catch (error) {
            debugger
            return reject(error)
        }
    })
}





async function manualScroll(page) {
    await page.evaluate(async () => {
        var totalHeight = 0;
        var distance = 100;
        let inc = 0
        window.scrollBy(0, distance);
        totalHeight += distance;
        inc = inc + 1
    });
}

async function getUrls(page) {

    const pageUrls = []



    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }

async function handler(page, context) {
    const { request: { userData: { subcategory, category } } } = context

    const url = await page.url()

    await page.waitForSelector('#ProductPageProductList')
    // onetrust-accept-btn-handler

    const acceptcookies = await page.$('.seg-popup-close')
    if (acceptcookies) {
        await page.click('.seg-popup-close')
    }

    return new Promise((resolve, reject) => {
        try {

            let inv = setInterval(async () => {
                // const { loaded, remained } = await page.$eval('.load-more-heading', el => {
                //     return { loaded: parseInt(el.getAttribute('data-items-shown')), remained: parseInt(el.getAttribute('data-total')) }
                // })
                const totalProducts = await page.evaluate(() => parseInt(document.querySelector('.appliedFilter.FiltrelemeUrunAdet span').innerHTML.replace(/[^\d]/g, '')))
                const collected = await page.evaluate(() => document.querySelectorAll('.ItemOrj.col-4').length)

                console.log('collected', collected)

                if (totalProducts > collected) {

                    //  await page.click('.button.js-load-more')
                    await manualScroll(page)

                } else {
                    clearInterval(inv)

                    const data = await page.$$eval('.ItemOrj.col-4', (productCards, _subcategory, _category, _opts) => {
                        return productCards.map(productCard => {
                            const priceNew = productCard.querySelector('.discountPrice span').textContent.replace(/\n/g, '').trim().replace('₺', '').replace('TL', '').trim()
                            const longlink = productCard.querySelector('.productName.detailUrl a[title]').href
                            const link = longlink.substring(longlink.indexOf("https://img.tozlu.com/") + 22)
                            const longImgUrl = productCard.querySelector('[data-original]').getAttribute('data-original')
                            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf('https://img.tozlu.com/') + 22)
                            const title = productCard.querySelector('.productName.detailUrl a[title]').getAttribute('title')

                            return {
                                title: 'tozlu ' + title,
                                priceNew,
                                imageUrl: imageUrlshort,
                                link,
                                timestamp: Date.now(),
                                marka: 'tozlu',
                                subcategory: _subcategory,
                                category: _category
                            }
                        })
                    }, subcategory, category)

          
                    console.log('data length_____', data.length, 'url:', url)
                    debugger
            
                    return resolve(data)

                }

            }, 100)
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
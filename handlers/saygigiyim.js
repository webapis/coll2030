
async function handler(page, context) {
    const { request: { userData: { subcategory, category,node } } } = context

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
                const collected = await page.evaluate(() => document.querySelectorAll('#ProductPageProductList .productItem').length)

                console.log('collected', collected)

                if (totalProducts > collected) {

                    //  await page.click('.button.js-load-more')
                    await manualScroll(page)

                } else {
                    clearInterval(inv)

                    const data = await page.$$eval('.productItem', (productCards, _subcategory, _category,_node) => {
                        return productCards.map(productCard => {
                            const priceNew = productCard.querySelector('.discountPrice span').textContent.replace(/\n/g, '').trim().replace('₺', '').replace('TL', '').trim()
                            const longlink = productCard.querySelector('.productName a').href
                            const link = longlink.substring(longlink.indexOf("https://www.saygigiyim.com/") + 27)
                            const longImgUrl = productCard.querySelector('img[data-original]') &&  productCard.querySelector('img[data-original]').getAttribute('data-original')
                            //const imageUrlshort = longImgUrl&& longImgUrl.substring(longImgUrl.indexOf('https://www.quzu.com.tr/') + 24)
                            const title = productCard.querySelector('.productName a').innerHTML

                            return {
                                title: 'saygigiyim ' + title,
                                priceNew,//:priceNew.replace('.','').replace(',','.').trim(),
                                imageUrl: longImgUrl,
                                link,
                                timestamp: Date.now(),
                                marka: 'saygigiyim',
                              //  subcategory: _subcategory,
                                category: _category,
                                node: _node
                            }
                        }).filter(f => f.imageUrl !== null)
                    }, subcategory, category,node)

          
                    console.log('data length_____', data.length, 'url:', url)
                    debugger
                    const withSub = data.map(m => {
                        const { title } = m
                        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
                        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[0]
                        debugger
                        return { ...m, subcategory: subcat }
                    })
                   
                    return resolve(withSub)

                }

            }, 170)
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
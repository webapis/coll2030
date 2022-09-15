
async function handler(page, context) {
    const { request: { userData: { subcategory, category, node } } } = context

    const url = await page.url()


    // onetrust-accept-btn-handler
    const productExist = await page.$('.appliedFilter.FiltrelemeUrunAdet span')
    const acceptcookies = await page.$('.seg-popup-close')
    if (acceptcookies) {
        await page.click('.seg-popup-close')
    }
    if (productExist) {
        return new Promise((resolve, reject) => {
            try {

                let inv = setInterval(async () => {
                    // const { loaded, remained } = await page.$eval('.load-more-heading', el => {
                    //     return { loaded: parseInt(el.getAttribute('data-items-shown')), remained: parseInt(el.getAttribute('data-total')) }
                    // })
                    const totalProducts = await page.evaluate(() => parseInt(document.querySelector('.appliedFilter.FiltrelemeUrunAdet span').innerHTML.replace(/[^\d]/g, '')))
                    const collected = await page.evaluate(() => document.querySelectorAll('#ProductPageProductList .productItem').length)
                    debugger
                    console.log('collected', collected)

                    if (totalProducts > collected) {
                        debugger
                        //  await page.click('.button.js-load-more')
                        await manualScroll(page)

                    } else {
                        clearInterval(inv)

                        const data = await page.$$eval('.productItem', (productCards, _subcategory, _category, _node) => {
                            return productCards.map(productCard => {
                                const priceNew = productCard.querySelector('.discountPrice span').textContent.replace(/\n/g, '').trim().replace('₺', '').replace('TL', '').trim()
                                const longlink = productCard.querySelector('.detailLink').href
                                const link = longlink.substring(longlink.indexOf("https://www.saygigiyim.com/") + 27)
                                const longImgUrl = productCard.querySelector('img[data-original]') && productCard.querySelector('img[data-original]').getAttribute('data-original')
                                //const imageUrlshort = longImgUrl&& longImgUrl.substring(longImgUrl.indexOf('https://www.quzu.com.tr/') + 24)
                                const title = productCard.querySelector('.detailLink').getAttribute('title')

                                return {
                                    title: 'saygigiyim ' + title.replace(/İ/g, 'i').toLowerCase(),
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
                        }, subcategory, category, node)

                        debugger
                        console.log('data length_____', data.length, 'url:', url)
                        debugger
                        const withSub = data.map(m => {
                            const { title } = m
                            const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
                            const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[subcategory.length - 1]
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
    } else {
        console.log('no product')
        return []
    }



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
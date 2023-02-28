const { formatMoney } = require('accounting-js')
async function handler(page, context) {



    const { request: { userData: { } } } = context

    const url = await page.url()
    
    await page.waitForSelector('.list-row')

    
    let messageWindwow = await page.$('#icon-close-button-1454703945249')
    if (messageWindwow) {
        await page.click('#icon-close-button-1454703945249')
    }


    return await new Promise((resolve, reject) => {
        try {
            let data = []
            let inv = setInterval(async () => {
                const max = await page.evaluate(() => Math.max(...document.querySelector('body > div.js-main-wrapper > div.js-container > div.container-list > div > div.col-sm-12.list__products.trio.js-list-products > div.list-content > div:nth-child(2) > div.js-pagination-info.list-pagination-info > div.js-pagination-count.pagination-info > div').innerHTML.split(" ").filter(Number)))
                const min = await page.evaluate(() => Math.min(...document.querySelector('body > div.js-main-wrapper > div.js-container > div.container-list > div > div.col-sm-12.list__products.trio.js-list-products > div.list-content > div:nth-child(2) > div.js-pagination-info.list-pagination-info > div.js-pagination-count.pagination-info > div').innerHTML.split(" ").filter(Number)))
                
                if (max === min) {
                    debugger
                    clearInterval(inv)
                    
                    data = await page.$$eval('.product-item-wrapper', (productCards, _subcategory, _category, _opts, _node) => {
                        return productCards.map(productCard => {
                            const priceNew = productCard.querySelector(".product-sale-price") ? productCard.querySelector(".product-sale-price").textContent.replace(/\n/g, '').trim().replace('₺', '').replace('TL', '').trim() : productCard.outerHTML
                            const longlink = productCard.querySelector('.product-name a') ? productCard.querySelector('.product-name a').href : productCard.outerHTML
                            const link = longlink.substring(longlink.indexOf("https://www.desa.com.tr/") + 24)
                            const longImgUrl = productCard.querySelector('[data-src]') ? productCard.querySelector('[data-src]').getAttribute('data-src') : productCard.outerHTML
                            const imageUrlshort = longImgUrl && longImgUrl.substring(longImgUrl.indexOf('https://14231c.cdn.akinoncloud.com/') + 35)
                            const title = productCard.querySelector(".product-name a") ? productCard.querySelector(".product-name a").innerHTML : productCard.outerHTML
                            return {
                                title: 'desa ' + title.replace(/İ/g, 'i').toLowerCase(),//,+ (_opts.keyword ? (title.toLowerCase().includes(_opts.keyword) ? '' : ' ' + _opts.keyword) : ''),
                                priceNew,
                                imageUrl: imageUrlshort,
                                link,
                                timestamp: Date.now(),
                                marka: 'desa',

                            }
                        }).filter(f => f.imageUrl !== null)
                    })


                    console.log('data length_____', data.length, 'url:', url)

                    resolve(data.map((m) => {
                        return { ...m, priceNew: formatMoney(parseFloat(m.priceNew), { symbol: "", precision: 2, thousand: ".", decimal: "," }) }
                    }).map(m => { return { ...m, title: m.title + " _" + process.env.GENDER } }))
                  
                } else {

                    let loading = await page.evaluate(() => document.querySelector('body > div.js-main-wrapper > div.js-container > div.container-list > div > div.col-sm-12.list__products.trio.js-list-products > div.list-content > div:nth-child(2) > div.js-pagination-info.list-pagination-info > div.js-load-more.load-more-button > div.js-loader-gif.list-loader.hidden'))
                    
                    if (loading !== null) {
                        

                        let messageWindwow = await page.$('#icon-close-button-1454703945249')
                        if (messageWindwow) {
                            
                            await page.click('#icon-close-button-1454703945249')
                        }
                        
                        const exts =await page.$('body > div.js-main-wrapper > div.js-container > div.container-list > div > div.col-sm-12.list__products.trio.js-list-products > div.list-content > div:nth-child(2) > div.js-pagination-info.list-pagination-info > div.js-load-more.load-more-button')
                        
                        await page.click('body > div.js-main-wrapper > div.js-container > div.container-list > div > div.col-sm-12.list__products.trio.js-list-products > div.list-content > div:nth-child(2) > div.js-pagination-info.list-pagination-info > div.js-load-more.load-more-button')
                        
                        console.log('clicked')
                   await manualScroll(page)
                        
                    } else {

                        console.log('loading...')
                    }



                }
            }, 2000)

        } catch (error) {
            
            console.log('error 1', error)
            reject(error)
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
const Apify = require('apify');
async function handler(page, context) {
    const { request: { userData: {start } } } = context

    const url = await page.url()

    await page.waitForSelector('.list__content')
    await autoScroll(page)
    debugger;
    const data = await page.$$eval('.js-product-wrapper.product-item', (productCards) => {
        return productCards.map(productCard => {

            const img = productCard.querySelector('.product-item__image.js-product-item-image a img').src
            const title = productCard.querySelector('.product-item__image.js-product-item-image a img').alt
            const priceNew = productCard.querySelector('pz-price').innerHTML.replace('TL', '').trim()//.replace(',','.')
            const link = productCard.querySelector('.product-item__image.js-product-item-image a').href

            return {
                title: 'beyyoglu '+ title.replace(/İ/g,'i').toLowerCase(),
                priceNew,
                imageUrl: img.substring(img.indexOf('https://179a38.cdn.akinoncloud.com/products/') + 44),
                link: link.substring(link.indexOf('https://www.beyyoglu.com/') + 25),
                timestamp: Date.now(),
                marka: 'beyyoglu',

            }
        }).filter(f => f.priceNew !== null)
    })


    // if (start) {
    //     await page.waitForSelector('pz-pagination')
    //     const productCount = await page.$eval('pz-pagination', element => parseInt(element.getAttribute('total')))
    //     console.log('productCount',productCount)
    //     const totalPages = Math.ceil(productCount / 24)
    //     for (let i = 2; i <= totalPages; i++) {
    //         const nextPage = `${url}?page=` + i
    //         const requestQueue = await Apify.openRequestQueue();
    //         requestQueue.addRequest({ url: nextPage, userData: { start: false } })
    //     }
    // }
    debugger;
    console.log('data length_____', data.length, 'url:', url)

    return data.map(m=>{return {...m,title:m.title+" _"+process.env.GENDER }})
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
                    if (inc === 200) {
                        clearInterval(timer);
                        resolve();
                    } else {
                        inc = inc + 1
                    }

                } else {
                    inc = 0
                }
            }, 50);
        });
    });
}
async function getUrls(page) {

    const pageUrls = []

    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
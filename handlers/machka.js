const Apify = require('apify');

async function handler(page, context) {
    const { request: { userData: { start, gender,marka } } } = context
    const url = await page.url()
    await page.waitForSelector('.ems-prd-list-wrapper')


    const data = await page.evaluate(() => {
        function extractPercentage(val1, val2) {
            const value1ll = parseInt(val1.substring(0, leftLastIndex(val1)).replace('.', ''))
            const value2ll = parseInt(val2.substring(0, leftLastIndex(val2)).replace('.', ''))
            const percentage = Math.floor((((value1ll) - (value2ll)) * 100) / (value1ll))
            return percentage
        }

        function leftLastIndex(value) {
            return value.lastIndexOf(',') !== -1 ? value.lastIndexOf(',') : value.length
        }
        const items = Array.from(document.querySelectorAll('.ems-prd'))
        return items.map(item => {
        
            const priceNew = item.querySelector('.ems-prd-price-last') && item.querySelector('.ems-prd-price-last').innerText.replace('₺', '').trim()
   


            const longlink = item.querySelector('.ems-prd-link.btn-full').href
            const link = longlink.substring(longlink.indexOf('https://www.machka.com.tr/urun/')+31)
            const longImgUrl = item.querySelector('.ems-responsive-item').getAttribute('data-image-src')
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf('https://image.machka.com.tr/unsafe/660x0/10.116.1.50:8000//Machka/products/SS22/Koleksiyon/')+91)

            return {
                title: item.querySelector('.ems-prd-title').innerText,
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'machka'
            }
        }).filter(f => f.imageUrl !== null)
    })
debugger;
    console.log('data length_____', data.length)


    const nextPageExists = await page.$('.btn.btn-size01.load-next')

    if (nextPageExists && start) {


        const nextPage = `${url}&page=2`
        const requestQueue = await Apify.openRequestQueue();

        requestQueue.addRequest({ url: nextPage, userData: { start: false, gender,marka } })
    } else if (nextPageExists && !start) {

        const pageUrl = url.slice(0, url.lastIndexOf("=") + 1)
        const pageNumber = parseInt(url.substr(url.lastIndexOf("=") + 1)) + 1

        const nextPage = pageUrl + pageNumber
        const requestQueue = await Apify.openRequestQueue();

        requestQueue.addRequest({ url: nextPage, userData: { start: false, gender,marka } })

    }

    console.log('data length_____', data.length, 'url:', url)
    return data


}
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 300);
        });
    });
}
async function getUrls(page, param) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}
module.exports = { handler, getUrls }
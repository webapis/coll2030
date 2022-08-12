


async function handler(page, context) {
    const { request: { userData: { subcategory, category, start, opts } } } = context
    debugger;


    const url = await page.url()

    debugger;

    await page.waitForSelector('.product-list-container')
    await autoScroll(page);

    debugger
    const data = await page.$$eval('.product-box-container', (productCards, _subcategory, _category, _opts) => {
        return productCards.map(productCard => {
            const priceNew = productCard.querySelector('.d-block.product-box-prices.product-box-price.pl-1.pr-2.text-black').textContent.replace(/\n/g, '').replace('TL', '').trim()
            const longlink = productCard.querySelector('.product-box-image-container').href
            const link = longlink.substring(longlink.indexOf("https://www.yargici.com/") + 24)
            const longImgUrl = document.querySelector('a.product-box-image-container img').src
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://img-incommerce-yargici.mncdn.com/") + 41)
            const title = productCard.querySelector('.product-box-zoom-image').alt
            return {
                title: 'yargici ' + title,
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'yargici',
                subcategory: _subcategory,
                category: _category
            }
        })
    }, subcategory, category, opts)



    //----------

    console.log('data length_____', data.length, 'url:', url)



    debugger;
    return data
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
            var timer = setInterval(async () => {

                var scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;
                inc = inc + 1

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve(true);
                }
            }, 150);
        });
    });
}
module.exports = { handler, getUrls }


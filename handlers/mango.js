
async function handler(page, context) {
    const { request: { userData: { subcategory, category, start } } } = context
    debugger;
    const url = await page.url()

    debugger;

    await page.waitForSelector('.catalog')
    await autoScroll(page);
  await page.waitFor(5000)
    debugger;
    const data = await page.$$eval('li.product-grid-block-dynamic.product-grid-block-dynamic__container', (list, _subcategory, _category) => {

        let products = []
        list.forEach(element => {

            const links = Array.from(element.querySelectorAll('a.product-link.product-grid-product__link.link')).map((m) => {
                const longlink = m.href
                return longlink.substring(longlink.indexOf('https://www.zara.com/tr/tr/') + 27)
            })
            const images = Array.from(element.querySelectorAll('img.media-image__image.media__wrapper--media')).map((m) => {
                const longimageurl = m.src
                return longimageurl.substring(longimageurl.indexOf('https://static.zara.net/photos/') + 31)
            })
            const titles = Array.from(element.querySelectorAll('img.media-image__image.media__wrapper--media')).map((m) => m.alt)
            const prices = Array.from(element.querySelectorAll('.price-current__amount')).map((m) => m.textContent.replace("TL", ''))


            const items = links.map((m, i) => {
                return {
                    title: 'zara '+ titles[i],

                    priceNew: prices[i],
                    imageUrl: images[i],
                    link: links[i],
                    timestamp: Date.now(),
                    marka: 'zara',
                    subcategory: _subcategory,
                    category: _category
                }
            })

            products.push(...items)
        })

        return products

    }, subcategory, category)

    //----------



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
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;
                inc = inc + 1
                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 120);
        });
    });
}
module.exports = { handler, getUrls }



const { formatMoney } = require('accounting-js')

async function handler(page, context) {
    const { request: { userData: { subcategory, category, start, opts,node } } } = context
    debugger;


    const url = await page.url()

    debugger;

    await page.waitForSelector('.CategoryList')
    await autoScroll(page);

    debugger
    const data = await page.$$eval('.productItemWrapper', (productCards, _subcategory, _category, _opts,_node) => {
        return productCards.map(productCard => {
            const priceNew = productCard.querySelector('.currentPrice') ? productCard.querySelector('.currentPrice').textContent.replace(/\n/g, '').replace('₺', '').trim() : productCard.querySelector('.addPriceDiscount span').textContent.replace('₺', '').trim()
            const longlink = productCard.querySelector('.detailLink').href
            const link = longlink.substring(longlink.indexOf("https://www.patirti.com/") + 24)
            const longImgUrl = productCard.querySelector(".ndImage").src
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://img1ptrti.mncdn.com/") + 28)
            const title = productCard.querySelector(".ProductName").innerHTML.replace(/\n/g, '')
            return {
                title: 'patirti ' + title,
                priceNew,
                imageUrl: imageUrlshort,
                link,

                timestamp: Date.now(),

                marka: 'patirti',
                subcategory: _subcategory,
                category: _category,
                node: _node


            }
        })
    }, subcategory, category, opts,node)



    //----------

    console.log('data length_____', data.length, 'url:', url)



    debugger;
    return data.map((m) => {
        return { ...m, priceNew: formatMoney(parseFloat(m.priceNew), { symbol: "", precision: 2, thousand: ".", decimal: "," }) }
    })
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



async function handler(page, context) {
    const { request: { userData: { } } } = context
    debugger;
    const url = await page.url()

    await page.waitForSelector('.ems-prd-list-page');
debugger
    await autoScroll(page)

    const data = await page.$$eval('.ems-prd', (items, _subcategory, _category,_node) => {

        return items.map(item => {
            const priceNew = item.querySelector('.ems-prd-price-last') && item.querySelector('.ems-prd-price-last').innerText.replace('₺', '').trim()

            const longlink = item.querySelector('.ems-prd-link.btn-full').href
            const link = longlink.substring(longlink.indexOf('https://www.machka.com.tr/urun/') + 31)
            const longImgUrl = item.querySelector('.ems-responsive-item').getAttribute('data-image-src')
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf('https://image.machka.com.tr/unsafe/660x0/10.116.1.50:8000//Machka/products/') + 75)

            return {
                title: 'machka ' + item.querySelector('.ems-prd-title').innerText.replace(/İ/g,'i').toLowerCase(),
                priceNew,//: priceNew.replace('.', '').replace(',00', '').trim(),
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'machka',

            }
        })
    });


    debugger;
    console.log('data length_____', data.length)
return data.map(m => { return { ...m, title: m.title + " _" + process.env.GENDER } })

}





async function autoScroll(page) {
    await page.evaluate(async () => {


        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            let inc = 0
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                var toth = 7775
                window.scrollBy(0, distance);
                totalHeight += distance;

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

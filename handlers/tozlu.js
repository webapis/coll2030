
const Apify = require('apify');
async function handler(page, context) {
    const { request: { userData: { subcategory, category } } } = context

    const url = await page.url()

    await page.waitForSelector('#ProductPageProductList')
    const dataset = await Apify.openDataset();
    // onetrust-accept-btn-handler

    const acceptcookies = await page.$('.seg-popup-close')
    if (acceptcookies) {
        await page.click('.seg-popup-close')
    }


    return new Promise((resolve, reject) => {
        try {
            let inv = setInterval(async () => {

                const totalProducts = await page.evaluate(() => parseInt(document.querySelector('.appliedFilter.FiltrelemeUrunAdet span').innerHTML.replace(/[^\d]/g, '')))
                const collected = await page.evaluate(() => document.querySelectorAll('.ItemOrj.col-4').length)

                console.log('collected', collected)

                if (totalProducts > collected) {
                    await manualScroll(page)

                } else {
                    clearInterval(inv)
                    debugger
                    const { items } = await dataset.getData()
                    const data = items.filter(f => f.products).map(p => [...p.products]).flat().map(m => {
                 
                         return {
                           title: 'tozlu ' +m.name,
                           priceNew: m.productSellPriceStr.replace('TL','').trim(),//.replace('.','').replace(',','.').trim() ,
                           imageUrl: ('https://img.tozlu.com/Uploads/UrunResimleri/thumb/'+m.imageName).replace('https://img.tozlu.com/',''),
                           link:m.defaultUrl,
                           timestamp: Date.now(),
                           marka: 'tozlu',
                           category,
                           subcategory
                         }
                       })
                       console.log('data length_____', data.length, 'url:', url)
                    return resolve(data)

                }

            }, 100)
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
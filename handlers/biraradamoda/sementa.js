const Apify = require('apify');
const { formatMoney } = require('accounting-js')
async function handler(page, context) {
    const { request: { userData: { start} } } = context
    debugger;
    const url = await page.url()

    await page.waitForSelector('#katalog')

    const dataset = await Apify.openDataset();
    const requestQueue = await Apify.openRequestQueue();
    const { items } = await dataset.getData()
    console.log('items',items)
    debugger
    // const products = items.filter(f=> f['PRODUCTS'] !==undefined).map(m=>m.PRODUCTS).flat().map(m=>{

    //     return {title:'sementa '+m.TITLE+ " _" + process.env.GENDER,priceNew:formatMoney(parseFloat(m.PRICE_SELL), { symbol: "", precision: 2, thousand: ".", decimal: "," }),imageUrl:m.IMAGE.BIG,link:m.URL,timestamp: Date.now(),marka:'sementa'}
    // })
    // await dataset.drop()
//     debugger
if(start){


    const {COUNT:productCount} =items[0]['CATEGORIES'][0]

debugger
    const totalPages = Math.ceil(productCount / 32)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 1; i <= totalPages; i++) {

        pageUrls.push(`${url}?pg=` + i)
        --pagesLeft


    }
    debugger
    for (let url of pageUrls) {


        await requestQueue.addRequest({ url, userData: { start: false } })

    }

    await dataset.drop()
}

    const data = await page.$$eval('.productItem', (productCards) => {
        return productCards.map(productCard => {
            const title = productCard.querySelector(".vitrinUrunAdi.detailLink").getAttribute('title')
            const img = productCard.querySelector(".imgInner img").src
            const priceNew = productCard.querySelector(".currentPrice").innerHTML.replace('TL', '').replace(/\n/g, '').trim()
            const link = productCard.querySelector(".vitrinUrunAdi.detailLink").href

            return {
                title: 'sementa ' + title.replace(/İ/g, 'i').toLowerCase(),
                priceNew: priceNew,//.replace(',','.'),
                imageUrl: img.substring(img.indexOf('https://cdn.sementa.com/') + 24),
                link: link.substring(link.indexOf('https://www.sementa.com/') + 24),
                timestamp: Date.now(),
                marka: 'sementa',

            }
        })
    })
    console.log('data length_____', data.length, 'url:', url)
    debugger

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
                inc = inc + 1
                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
}
async function getUrls(page) {

    const pageUrls = []


    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
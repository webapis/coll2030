
const { formatMoney } = require('accounting-js')
async function handler(page, context) {
    const { request: { userData: { } } } = context

    const url = await page.url()

    await page.waitForSelector('#ProductPageProductList')
    await page.waitForSelector('.ItemOrj')
    debugger
    const data = await page.$$eval('.productItem', (productCards) => {
        return productCards.map(productCard => {

            const imageUrl = productCard.querySelector(".productSliderImage").currentSrc ? productCard.querySelector(".productSliderImage").currentSrc: document.querySelector('.productItem').outerHTML
            const title = productCard.querySelector('.detailLink.detailUrl') ? productCard.querySelector('.detailLink.detailUrl').getAttribute('title') : document.querySelector('.productItem').outerHTML
            const priceNew = productCard.querySelector('.discountPrice span').innerText.replace('₺', '')
            const longlink = productCard.querySelector('.detailLink.detailUrl').href
            const link = longlink.substring(longlink.indexOf("https://www.dericlub.com.tr/") + 28)

            const imageUrlshort = imageUrl && imageUrl.substring(imageUrl.indexOf("https://static.ticimax.cloud/") + 29)

            return {
                title: 'dericlub ' + title.replace(/İ/g, 'i').toLowerCase(),
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'dericlub',
            }
        }).filter(f => f.imageUrl !== null && f.title.length > 3)
    })

    console.log('data length_____', data.length, 'url:', url, process.env.GENDER)
    debugger
    console.log("process.env.GENDER ")
    const formatprice = data.map((m) => {
        return { ...m, title: m.title + " _" + process.env.GENDER }
    })


    return formatprice
}

async function getUrls(page) {
    const url = await page.url()
    await page.waitForSelector('.appliedFilter.FiltrelemeUrunAdet span')
    const totalPages = await page.evaluate(() => Math.max(...Array.from(document.querySelectorAll('.appliedFilter.FiltrelemeUrunAdet span')).map(m => m.innerHTML.replace(/[^\d]/g, '')).filter(Number)))
    // const totalPages = Math.ceil(productCount / 60)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

        pageUrls.push(`${url}?sayfa=` + i)
        --pagesLeft


    }

    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
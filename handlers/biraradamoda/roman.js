
async function handler(page, context) {
    const { request: { userData: { } } } = context
    debugger;
    const url = await page.url()

    await page.waitForSelector('.category-product-list')


    const data = await page.$$eval('.category-product-list .item.triple-view.instock', (productCards) => {
        return productCards.map(productCard => {

            const title = productCard.querySelector('.product-list-name') && productCard.querySelector('.product-list-name').textContent
            const priceNew = productCard.querySelector('.n-price').textContent.replace('TL', '').trim()
            const longlink = productCard.querySelector('[p-item-link]').href.trim()
            const link = longlink.substring(longlink.indexOf("https://www.roman.com.tr/detay/") + 31)
            const longImgUrl = productCard.querySelector('[p-item-link] img').src.trim()
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://romancdn.sysrun.net/Content/ProductImage/Original/") + 58)
            return {
                title:'roman '+title.replace(/İ/g,'i').toLowerCase(),
                priceNew,//:priceNew.replace('.','').replace(',','.').trim(),
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'roman',



            }
        })
    })

    console.log('data length_____', data.length, 'url:', url)

    debugger;

    return data
}

async function getUrls(page) {
    const url = await page.url()
    debugger;
    await page.waitForSelector('.page-product-count')
    const productCount = await page.$eval('.page-product-count', element => parseInt(element.textContent.replace(/[^\d]/g, '')))
    debugger;
    const totalPages = Math.ceil(productCount / 24)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {



        pageUrls.push(`${url}?p=` + i)
        --pagesLeft


    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
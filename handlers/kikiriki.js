
async function handler(page, context) {
    const { request: { userData: { subcategory, category } } } = context

    const url = await page.url()

    await page.waitForSelector('.i-amphtml-fill-content')


    const data = await page.$$eval('.product-list-item', (productCards, _subcategory, _category) => {
        return productCards.map(productCard => {


            const title = productCard.querySelector('.product-title a[title]').getAttribute('title').trim()
            const priceNew = productCard.querySelector('.product-price span').textContent.replace('TL', '').trim()
            const longlink = productCard.querySelector('.product-image a').href
            const link = longlink.substring(longlink.indexOf("https://tr.kikiriki.com/") + 24)
            const longImgUrl = productCard.querySelector('.product-image img') ===null ? productCard.querySelector('amp-img').getAttribute('src'): productCard.querySelector('.product-image img').src
            const imageUrlshort = longImgUrl && longImgUrl.substring(longImgUrl.indexOf("https://cdn.vebigo.com/") + 23)
            return {
                title: 'kikiriki ' + title,
                priceNew: priceNew.replace(',','.'),
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'kikiriki',
                subcategory: _subcategory,
                category: _category

            }
        })//.filter(f => f.imageUrl !== null)
    }, subcategory, category)

    console.log('data length_____', data.length, 'url:', url)
    debugger


    return data
}

async function getUrls(page) {
    const url = await page.url()
    await page.waitForSelector('.flex-fill.m-auto.font-m')
    const productCount = await page.$eval('.flex-fill.m-auto.font-m', element => parseInt(element.textContent.replace(/[^\d]/g, '')))
    const totalPages = Math.ceil(productCount / 24)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {



        pageUrls.push(`${url}?page=` + i)
        --pagesLeft


    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }

async function handler(page, context) {
    const { request: { userData: { subcategory, category } } } = context

    const url = await page.url()

    await page.waitForSelector('.i-amphtml-fill-content')


    const data = await page.$$eval('.product-list-item', (productCards, _subcategory, _category) => {
        return productCards.map(productCard => {

            const imageUrl = productCard.querySelector('.product-image img') && productCard.querySelector('.product-image img').src
            const title = productCard.querySelector('.product-title a[title]').getAttribute('title').trim()
            const priceNew = productCard.querySelector('.product-price span').textContent.replace('TL', '').trim()
            const longlink = productCard.querySelector('.product-image a').href
            //  const link = longlink.substring(longlink.indexOf("defacto.com.tr/") + 15)
            //  const longImgUrl = imageUrl && 'https:' + imageUrl.substring(imageUrl.lastIndexOf('//'), imageUrl.lastIndexOf('.jpg') + 4)
            //  const imageUrlshort = imageUrl && longImgUrl.substring(longImgUrl.indexOf("https://dfcdn.defacto.com.tr/") + 29)
            return {
                title: 'kikiriki ' + title,
                priceNew: priceNew,
                imageUrl,
                link: longlink,
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
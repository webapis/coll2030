
async function handler(page, context) {
    const { request: { userData: { subcategory, category, node } } } = context
    debugger;
    const url = await page.url()

    await page.waitForSelector('#productList')


    const data = await page.$$eval('#productList div[data-page]', (productCards, _subcategory, _category, _node) => {
        return productCards.map(productCard => {

            const title = productCard.querySelector('.m-productCard__detail .m-productCard__title').textContent
            const desc = productCard.querySelector('.m-productCard__detail .m-productCard__desc').textContent
            const priceNew = productCard.querySelector('.m-productCard__newPrice').textContent.replace('TL', '').trim()//.replace('.','').trim()
            const longlink = productCard.querySelector('div[data-page] a').href
            const link = longlink.substring(longlink.indexOf("https://www.beymen.com/") + 23)
            const longImgUrl = productCard.querySelectorAll('.m-productImageList [data-src]')[0].getAttribute('data-src').trim()
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://cdn.beymen.com/mnresize/") + 32)

            return {
                title: 'beymen ' + title + ' ' + desc,
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'beymen',
                // subcategory: subcat.length > 0 ? subcat[0] : _subcategory[0],
                category: _category,
                node: _node


            }
        })
    }, subcategory, category, node)

    console.log('data length_____', data.length, 'url:', url)

    debugger;
    const withSub = data.map(m => {
        const { title } = m
        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[subcategory.length - 1]
        debugger
        return { ...m, subcategory: subcat, title: title.replace(/İ/g, 'i').toLowerCase() }
    })
    return withSub
}

async function getUrls(page) {
    const url = await page.url()
    debugger;
    await page.waitForSelector('.o-productList__top--breadcrumbCount span')
    const productCount = await page.$eval('.o-productList__top--breadcrumbCount span', element => parseInt(element.textContent))
    debugger;
    const totalPages = Math.ceil(productCount / 48)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

        pageUrls.push(`${url}?sayfa=` + i)
        --pagesLeft

    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
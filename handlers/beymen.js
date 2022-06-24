
async function handler(page, context) {
    const { request: { userData: { subcategory, category } } } = context
    debugger;
    const url = await page.url()

    await page.waitForSelector('#productList')


    const data = await page.$$eval('#productList div[data-page]', (productCards, _subcategory, _category) => {
        return productCards.map(productCard => {

            const title = productCard.querySelector('.m-productCard__detail .m-productCard__title').textContent
            const desc =productCard.querySelector('.m-productCard__detail .m-productCard__desc').textContent
            const priceNew = productCard.querySelector('.m-productCard__newPrice').textContent.replace('TL','').trim()
            const longlink = productCard.querySelectorAll('.m-productCard__detail a')[1].href.trim()
           const link = longlink.substring(longlink.indexOf("https://www.beymen.com/") + 23)
            const longImgUrl = productCard.querySelectorAll('.m-productImageList [data-src]')[0].getAttribute('data-src').trim()
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://cdn.beymen.com/mnresize/") + 32)
            return {
                title: title+' '+desc,
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'roman',
                subcategory: _subcategory,
                category: _category


            }
        })
    }, subcategory, category)

    console.log('data length_____', data.length, 'url:', url)

    debugger;

    return data
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



        pageUrls.push(`${url}?p=` + i)
        --pagesLeft


    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
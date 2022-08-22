
const { formatMoney } = require('accounting-js')
async function handler(page, context) {
    const { request: { userData: { subcategory, category, node } } } = context

    const url = await page.url()

    await page.waitForSelector('.catalog-products')


    const data = await page.$$eval('.catalog-products .product-card', (productCards, _subcategory, _category, _node) => {
        return productCards.map(productCard => {

            const imageUrl = productCard.querySelector('.catalog-products .product-card .product-card__image .image-box .product-card__image--item.swiper-slide img').getAttribute('data-srcset')
            const title = productCard.querySelector('.product-card__title a').getAttribute('title').trim()
            const priceNew = productCard.querySelector('.product-card__price--new') && productCard.querySelector('.product-card__price--new').textContent.trim().replace('₺', '').replace('TL', '')
            const longlink = productCard.querySelector('.catalog-products .product-card .product-card__image .image-box a').href
            const link = longlink.substring(longlink.indexOf("defacto.com.tr/") + 15)
            const longImgUrl = imageUrl && 'https:' + imageUrl.substring(imageUrl.lastIndexOf('//'), imageUrl.lastIndexOf('.jpg') + 4)
            const imageUrlshort = imageUrl && longImgUrl.substring(longImgUrl.indexOf("https://dfcdn.defacto.com.tr/") + 29)
            return {
                title: 'defacto ' + title,
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'defacto',
                subcategory: _subcategory,
                category: _category,
                node: _node

            }
        })//.filter(f => f.imageUrl !== null)
    }, subcategory, category, node)

    console.log('data length_____', data.length, 'url:', url)



    return data.map((m) => {
        return { ...m, priceNew: formatMoney(parseFloat(m.priceNew), { symbol: "", precision: 2, thousand: ".", decimal: "," }) }
    })
}

async function getUrls(page) {
    const url = await page.url()
    await page.waitForSelector('.catalog__meta--product-count span')
    const productCount = await page.$eval('.catalog__meta--product-count span', element => parseInt(element.innerHTML))
    const totalPages = Math.ceil(productCount / 60)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {



        pageUrls.push(`${url}?page=` + i)
        --pagesLeft


    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
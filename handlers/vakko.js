
async function handler(page, context) {
    const { request: { userData: { subcategory, category, opts,node } } } = context
debugger;
    const url = await page.url()

    await page.waitForSelector('.category__products')


    const data = await page.$$eval('.category__products .product__each', (productCards, _subcategory, _category, _opts,_node) => {
        return productCards.map(productCard => {
            const brand = productCard.querySelector('.product__each--brand__name').textContent.replace('\n', '').trim()
            const prodName = productCard.querySelector('.product__each--name-text').textContent.replace('\n', '').trim()
            const priceNew = productCard.querySelector('.product__each--price__span') ? productCard.querySelector('.product__each--price__span').innerHTML.replace('₺', '').trim() : productCard.querySelector('.product__each--price ins').innerHTML.replace('₺', '').trim()
            const longlink = productCard.querySelector('.hoverableContainer').href
            const link = longlink.substring(longlink.indexOf("https://www.vakko.com/") + 22)
            const longImgUrl = productCard.querySelector('.hoverableContainer [data-lazy]').getAttribute('data-lazy')
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://vakko.akinoncdn.com/products/") + 37)
            const title = brand + ' ' + prodName
            return {
                title:'vakko '+title,

                priceNew,//:priceNew.replace('.','').replace(',','.').trim(),

                imageUrl: imageUrlshort,
                link,

                timestamp: Date.now(),

                marka: 'vakko',
                subcategory: _opts ? _opts.find((f) => title.includes(f)).replace('ELBİSE','ELBISE').toLowerCase() : _subcategory,
                category: _category,
                node: _node


            }
        })
    }, subcategory, category, opts,node)


    console.log('data length_____', data.length, 'url:', url)


    debugger;
    return data
}

async function getUrls(page) {
    const url = await page.url()

    await page.waitForSelector('.search-total-count')
    const productCount = await page.$eval('.search-total-count', element => parseInt(element.innerHTML))
    const totalPages = Math.ceil(productCount / 48)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {



        pageUrls.push(`${url}?page=` + i)
        --pagesLeft


    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
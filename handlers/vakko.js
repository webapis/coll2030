
async function handler(page, context) {
    const { request: { userData: { subcategory, category } } } = context

    const url = await page.url()

    await page.waitForSelector('.category__products')


    const data = await page.$$eval('.category__products .product__column', (productCards, _subcategory, _category) => {
        return productCards.map(productCard => {
            const brand = productCard.querySelector('.product__each--brand__name').textContent.replace('\n', '').trim()
         //   const title = productCard.querySelector('.product__each--name-text').textContent.replace('\n', '').trim()
          //  const priceNew = productCard.querySelector('.product__each--price__span').textContent.replace('₺','').trim()
          //  const longlink = productCard.querySelector('.hoverableContainer').href
          //  const link = longlink.substring(longlink.indexOf("defacto.com.tr/") + 15)
        //    const longImgUrl = productCard.querySelector('.hoverableContainer [data-lazy]').getAttribute('data-lazy')
           // const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf("https://dfcdn.defacto.com.tr/") + 29)
            return {
                title: brand ,//+ ' ' + title,

                priceNew,

                imageUrl: longImgUrl,
                link:longlink,

                timestamp: Date.now(),

                marka: 'vakko',
                subcategory: _subcategory,
                category: _category


            }
        })
    }, subcategory, category)

    console.log('data length_____', data.length, 'url:', url)



    return data
}

async function getUrls(page) {
    const url = await page.url()
    debugger;
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


async function handler(page, context) {
    const { request: { userData: { subcategory, category, start } } } = context
    debugger;
    const url = await page.url()
    await page.waitForSelector('#ProductPageProductList')
    debugger;
    const data = await page.$$eval('#ProductPageProductList .productItem', (productCards, _subcategory, _category) => {
        return productCards.map(productCard => {


            const title = productCard.querySelector('.productName a[title]').getAttribute('title').trim()
            const priceNew = productCard.querySelector('.discountPrice span').innerText.replace('₺','').trim()
          //  const longlink = productCard.querySelector('.grid-view-item__link.grid-view-item__image-container.full-width-link').href
          //  const link = longlink.substring(longlink.indexOf('https://arzukaprol.com/') + 23)
          //  const longImgUrl = productCard.querySelector('.product-card img').currentSrc//.split(',')[2]
         //   const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf('https://cdn.shopify.com/s/files/1/0342/2348/9163/products/') + 58)

            return {
                title,
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'arzukaprol',
                subcategory: _subcategory,
                category: _category
            }
        }).filter(f => f.imageUrl !== null)
    }, subcategory, category)

    console.log('data length_____', data.length, 'url:', url)




    return data
}

async function getUrls(page) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}
module.exports = { handler, getUrls }
async function handler(page) {
    const url = await page.url()
    await page.waitForSelector('.product-grid .product-card')
    const data = await page.evaluate(() => {
        const items = window.catalogModel.CatalogList.Items
        return items.map(item => {
            const { DefaultOptionImageUrl: imageUrl,
                Price: priceNew,
                ModelUrl,
                ProductDescription: title,
            } = item


            return {
                title,

                priceNew: priceNew.replace('TL', '').trim(),
                imageUrl: imageUrl.substring(imageUrl.indexOf('https://img-lcwaikiki.mncdn.com/mnresize/600/-/pim/productimages/') + 65),
                link: ModelUrl.substring(32),
                timestamp: Date.now(),
                marka: 'lcwaikiki'

            }
        }).filter(f => f.imageUrl !== null)
    })
    debugger;

    console.log('data length_____', data.length, 'url:', url)

    return data
}

async function getUrls(page) {
    const param = '&PageIndex='
    await page.waitForSelector('#root > div > div.product-list-container > div.product-list > div.container-fluid.product-list-heading > div > div > span > p > span:nth-child(2)')

    const firstUrl = await page.url()

    const productCount = await page.$eval('#root > div > div.product-list-container > div.product-list > div.container-fluid.product-list-heading > div > div > span > p > span:nth-child(2)', element => parseInt(element.innerText.replace('.', '')))
    const totalPages = Math.ceil(productCount / 96)
    const pageUrls = []
    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {
        const url = `${firstUrl}${param}${i}`
  

        if (pagesLeft > 0) {
            pageUrls.push(url)
            --pagesLeft
        }
    }
    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
async function handler(page,context) {
    const { request: { userData: {  subcategory, category } } } = context
    const url = await page.url()
    await page.waitForSelector('.product-grid .product-card')
    debugger
    const data = await page.evaluate((_subcategory, _category) => {
        const items = window.catalogModel.CatalogList.Items
        return items.map(item => {
            const { DefaultOptionImageUrl: imageUrl,
                Price: priceNew,
               ModelUrl,
                ProductDescription: title,
            } = item

            
            return {
                title: 'lcwaikiki '+title,

                priceNew: priceNew.replace('TL', '').trim().replace(',','.'),
                imageUrl: imageUrl.substring(imageUrl.indexOf('https://img-lcwaikiki.mncdn.com/') + 32),
                link: ModelUrl.substring(32),
                timestamp: Date.now(),
                marka: 'lcwaikiki',
                category:_category,
                subcategory:_subcategory

            }
        }).filter(f => f.imageUrl !== null)
    },subcategory, category)
    debugger;

    console.log('data length_____', data.length, 'url:', url)

    return data
}

async function getUrls(page) {
    debugger
    const param = '?PageIndex='
    await page.waitForSelector('.product-list-heading__product-count')
debugger;
    const firstUrl = await page.url()

    const productCount = await page.$eval('.product-list-heading__product-count p', element => parseInt(element.innerText.replace(/\D/g, '')))
    debugger;
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
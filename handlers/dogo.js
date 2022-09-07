
async function handler(page, context) {
    const { request: { userData: { subcategory, category,node } } } = context

    const url = await page.url()

    await page.waitForSelector('.fl.col-12.catalogWrapper.productListBox')
    const products = await page.evaluate(()=>window.PRODUCT_DATA)

    debugger;

   const data = products.map(product => {
        debugger;
            const longImage =product.image
            const title = product.name
            const priceNew = product.total_sale_price
            const link = product.url
        debugger;
            return {
                title:'dogo '+title.replace(/İ/g,'i').toLowerCase(),
                priceNew,
                imageUrl: longImage.substring(longImage.indexOf('https://www.dogostore.com/') + 26),
                link,
                timestamp: Date.now(),
                marka: 'dogo',
              //  subcategory,
                category,
                node
            }
        })


    console.log('data length_____', data.length, 'url:', url)

    debugger;
    const withSub = data.map(m => {
        const { title } = m
        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[subcategory.length-1]
        debugger
        return { ...m, subcategory: subcat }
    })
    return withSub
}

async function getUrls(page) {

    const url = await page.url()
    await page.waitForSelector('.productPager')

    const totalPages = await page.$eval('.productPager', element => parseInt(element.querySelectorAll('a[title]')[element.querySelectorAll('a[title]').length-2].getAttribute('title').replace(/[^\d]/g,'')))

    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

     

        pageUrls.push(`${url}?pg=` + i)
        --pagesLeft
    

    }

    return { pageUrls, productCount:0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
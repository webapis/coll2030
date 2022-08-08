
async function handler(page, context) {
    const { request: { userData: { subcategory, category,opts } } } = context

    const url = await page.url()
debugger
    await page.waitForSelector('.fl.col-12.catalogWrapper')
    const products = await page.evaluate(()=>window.PRODUCT_DATA)

    debugger;

   const data = products.map(product => {
   
            const longImage =product.image
            const title = product.name
            const priceNew = product.total_sale_price
            const link = product.url
  
            return {
                title:'vitrin '+title,
                priceNew,
                imageUrl: longImage.substring(longImage.indexOf('https://www.vitrin.com.tr') + 25),
                link,
                timestamp: Date.now(),
                marka: 'vitrin',
                subcategory,
                category
            }
        })


    console.log('data length_____', data.length, 'url:', url)

    debugger;

    return data
}

async function getUrls(page) {
debugger
    const url = await page.url()
    await page.waitForSelector('.productPager')

    const totalPages = await page.$eval('.productPager', element => parseInt(element.querySelectorAll('a[title]')[element.querySelectorAll('a[title]').length-2].getAttribute('title').replace(/[^\d]/g,'')))
debugger
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

     

        pageUrls.push(`${url}?pg=` + i)
        --pagesLeft
    

    }

    return { pageUrls, productCount:0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
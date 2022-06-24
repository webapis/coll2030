
async function handler(page,context) {
    const { request: { userData: {  subcategory, category } } } = context
debugger;
    const url = await page.url()

    await page.waitForSelector('.products')


    const data = await page.$$eval('.products .prd', (productCards, _subcategory, _category) => {
        return productCards.map(productCard => {

         const title = productCard.querySelector('.prd-title').innerText.trim()
            const priceNew = productCard.querySelector('.prc.prc-last').innerText.replace('₺','').trim()
            const longlink = productCard.querySelector('.prd-link').href.trim()
            const link = longlink.substring(longlink.indexOf("https://www.penti.com/tr/") + 25)
            const longImgUrl = productCard.querySelector('.prd img[data-srcset]').getAttribute('data-srcset').split(",")[1].replace('2x','').trim()
         const imageUrlshort =  longImgUrl.substring(longImgUrl.indexOf("https://file-penti.mncdn.com/mnresize/") + 38)
            return {
                title,
                priceNew: priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'penti',
                subcategory:_subcategory,
                category:_category


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
    await page.waitForSelector('.plp-info')
    const productCount = await page.$eval('.plp-info', element => parseInt(element.innerText.replace(/[^\d]/g, "")))
    debugger;
    const totalPages = Math.ceil(productCount / 20)
    const pageUrls = []

    let pagesLeft = totalPages  
    for (let i = 2; i <= totalPages; i++) {

     

        pageUrls.push(`${url}?page=` + i)
        --pagesLeft
    

    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
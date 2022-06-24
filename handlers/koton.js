
async function handler(page,context) {
    const { request: { userData: {  subcategory, category } } } = context
    const url = await page.url()
    await page.waitForSelector('.productGrid .product-item')
   
    const data = await page.evaluate((_subcategory, _category) => {
        const productCards = Array.from(document.querySelectorAll('.productGrid .product-item')).filter(a => a.querySelector('.image img') !== null && a.querySelector('.image img').getAttribute('data-src') !== null)
        return productCards.map(productCard => {

            const imageUrl = productCard.querySelector('.image img').getAttribute('data-src')
            const firstPrice = productCard.querySelector('.firstPrice') ? productCard.querySelector('.firstPrice').innerText.trim().replace('₺', '').replace('TL', '') : null
            const insteadPrice = productCard.querySelector('.insteadPrice') ? productCard.querySelector('.insteadPrice').innerText.trim().replace('₺', '').replace('TL', '') : null
            const newPrice = productCard.querySelector('.newPrice') ? productCard.querySelector('.newPrice').innerText.trim().replace('₺', '').replace('TL', '') : null
      
            const priceNew = firstPrice || newPrice
            const discPerc = insteadPrice ? Math.floor(((parseInt(insteadPrice) - parseInt(priceNew)) * 100) / parseInt(insteadPrice)) : null
            const gender =window.location.href.substring(window.location.href.indexOf('.com/tr/')+8,window. location. href.indexOf('/c/')).replace('i','ı')

            const longlink =  productCard.querySelector('.prc-name').href
            const link = longlink.substring(longlink.indexOf('https://www.koton.com/tr/')+25)
            const longImgUrl = imageUrl && productCard.querySelector('.image img').getAttribute('data-src')
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf('https://ktnimg.mncdn.com/mnresize/842/1105/product-images/')+58)
            const removePostfix = link.substring(0,link.indexOf('&listName'))
            return {
                title: productCard.querySelector('.prc-name').innerText,
                priceNew,
                imageUrl: imageUrlshort,
                link:removePostfix,
                timestamp: Date.now(),
                marka:'koton',
                subcategory:_subcategory,
                category:_category
            }
        })//.filter(f => f.imageUrl !== null)

    },subcategory, category)
debugger;

    console.log('data length_____', data.length, 'url:', url)
    return data
}
async function getUrls(page) {

    const url = await page.url()
    await page.waitForSelector('.plt-count')
    const productCount =  await page.$eval('.plt-count', element => parseInt(element.textContent.replace(/[^\d]/g, "")))
    const totalPages = Math.ceil((productCount-(191*2)) / 191)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 1; i <= totalPages; i++) {

     
        if (pagesLeft > 0) {

            pageUrls.push(`${url}?q=%3Arelevance&psize=192&page=` + i)
            --pagesLeft
        }
     
    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }

}
module.exports = { handler, getUrls }


/*
async function getUrls(page) {

    await page.waitForSelector('.plt-count')
    const productCount = await page.$eval('.plt-count', element => parseInt(element.textContent.replace(/[^\d]/g, "")))
    debugger;
    const withMultipage = await page.$('.pagingBar .paging')
    if (withMultipage) {

        const urls = await page.evaluate(() => {
            const arr = Array.from(document.querySelector('.pagingBar .paging').querySelectorAll('a')).map(t => t.href)
            const remdub = arr.filter(function (item, pos) {
                return arr.indexOf(item) == pos;
            })
            const lastURL = remdub[remdub.length - 1]
            const lastPage = parseInt(lastURL.substring(lastURL.lastIndexOf('=') + 1))
            const totalPages = lastPage
            const pageUrls = []
            const urlTemplate = lastURL.substring(0, lastURL.lastIndexOf('=') + 1)
            let pagesLeft = totalPages
            for (let i = 1; i <= totalPages; i++) {

                if (pagesLeft > 0) {
                    pageUrls.push(`${urlTemplate}` + i)
                    --pagesLeft
                }
            }

            return pageUrls
        })
        return { pageUrls: urls, productCount, pageLength: urls.length + 1 }
    } else
        return { pageUrls: [], productCount, pageLength: 1 }

}
module.exports = { handler, getUrls }
*/
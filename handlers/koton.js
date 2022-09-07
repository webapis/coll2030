
async function handler(page, context) {
    const { request: { userData: { subcategory, category, node } } } = context
    const url = await page.url()
    await page.waitForSelector('.list__products')

    const data = await page.evaluate((_subcategory, _category, _node) => {
        const productCards = Array.from(document.querySelectorAll('.js-product-wrapper.product-item'))
        return productCards.map(productCard => {
            const newPrice = productCard.querySelector('.-actuel') ? productCard.querySelector('.-actuel').innerText.trim().replace('₺', '').replace('TL', '') : null
            const longImgUrl = productCard.querySelector('img[alt]').src ? productCard.querySelector('img[alt]').src : productCard.querySelector('img[alt]').getAttribute('data-src')
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf('https://ktnimg2.mncdn.com/') + 26)
            const longLink = productCard.querySelector('.js-product-wrapper.product-item a').href
            const shortLink = longLink.substring(longLink.indexOf('https://www.koton.com/') + 22)
            return {
                title: 'koton ' + productCard.querySelector('img').alt.replace(/İ/g,'i').toLowerCase(),
                priceNew: newPrice.trim(),//: newPrice.replace(',', '.').trim(),
                imageUrl: imageUrlshort,
                link: shortLink,
                timestamp: Date.now(),
                marka: 'koton',
               // subcategory: _subcategory,
                category: _category,
                node: _node
            }
        })//.filter(f => f.imageUrl !== null)

    }, subcategory, category, node)
    debugger;

    console.log('data length_____', data.length, 'url:', url)
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
    await page.waitForSelector('.result.-only-desktop')
    const productCount = await page.$eval('.result.-only-desktop', element => parseInt(element.textContent.replace(/[^\d]/g, "")))
    const totalPages = Math.ceil(productCount / 59)
    const pageUrls = []
    debugger
    let pagesLeft = totalPages
    for (let i = 1; i <= totalPages; i++) {


        if (pagesLeft > 0) {

            pageUrls.push(`${url}?page=` + i)
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
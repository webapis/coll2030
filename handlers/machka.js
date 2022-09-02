const Apify = require('apify');

async function handler(page, context) {
    const { request: { userData: { start, subcategory, category,node } } } = context
    const url = await page.url()
    debugger;
    await page.waitForSelector('.ems-prd-list-page');
    debugger;
    await page.waitForSelector('.ems-prd');
    debugger;
    const data = await page.$$eval('.ems-prd', (items, _subcategory, _category,_node) => {

        return items.map(item => {
            const priceNew = item.querySelector('.ems-prd-price-last') && item.querySelector('.ems-prd-price-last').innerText.replace('₺', '').trim()

            const longlink = item.querySelector('.ems-prd-link.btn-full').href
            const link = longlink.substring(longlink.indexOf('https://www.machka.com.tr/urun/') + 31)
            const longImgUrl = item.querySelector('.ems-responsive-item').getAttribute('data-image-src')
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf('https://image.machka.com.tr/unsafe/660x0/10.116.1.50:8000//Machka/products/') + 75)

            return {
                title: 'machka ' + item.querySelector('.ems-prd-title').innerText,
                priceNew,//: priceNew.replace('.', '').replace(',00', '').trim(),
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'machka',
                category: _category,
             //   subcategory: _subcategory,
                node: _node
            }
        })
    }, subcategory, category,node);


    debugger;
    console.log('data length_____', data.length)

    const isNotHidden = await page.$eval('.btn.btn-size01.load-next', (elem) => {
        return window.getComputedStyle(elem).getPropertyValue('display') !== 'none'
    });
    debugger;


    if (isNotHidden && start) {

        debugger;
        const pageUrl = url.slice(0, url.lastIndexOf("=") + 1)
        const pageNumber = parseInt(url.substr(url.lastIndexOf("=") + 1)) + 1

        const nextPage = pageUrl + pageNumber
        const requestQueue = await Apify.openRequestQueue();
        requestQueue.addRequest({ url: nextPage, userData: { start: false, subcategory, category } })
        debugger;
    } else if (isNotHidden && !start) {
        debugger;
        const pageUrl = url.slice(0, url.lastIndexOf("=") + 1)
        const pageNumber = parseInt(url.substr(url.lastIndexOf("=") + 1)) + 1

        const nextPage = pageUrl + pageNumber
        const requestQueue = await Apify.openRequestQueue();
        debugger;
        requestQueue.addRequest({ url: nextPage, userData: { start: false, subcategory, category } })

    }

    console.log('data length_____', data.length, 'url:', url)
    const withSub = data.map(m => {
        const { title } = m
        const subcatmatches = subcategory.filter(f => title.toLowerCase().includes(f))
        const subcat = subcatmatches.length > 0 ? subcatmatches[0] : subcategory[0]
        debugger
        return { ...m, subcategory: subcat }
    })
    return withSub


}

async function getUrls(page, param) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}
module.exports = { handler, getUrls }
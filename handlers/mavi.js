const Apify = require('apify');

async function handler(page, context) {
    const { request: { userData: { start,subcategory,category,node } } } = context
    debugger;
    const url = await page.url()
    await page.waitForSelector('.product-list-cards')

    await page.waitForSelector('.product-item')

    debugger;
    const data = await page.$$eval('.product-item', (items,_subcategory,_category,_node) => {

        return items.map(item => {
            let productTitle =document.querySelector('.product-title').textContent
            let productDesc=document.querySelector('.product-desc').textContent
            const priceNew = item.querySelector('.price') && item.querySelector('.price').innerText.replace('TL', '').trim()
            const longlink = item.querySelector('.product-card-info') && item.querySelector('.product-card-info').href
            const link =  longlink.substring(longlink.indexOf('https://www.mavi.com/') + 21)
            const longImgUrl =  item.querySelectorAll("[data-responsive-image] img")[0].getAttribute('data-src')
            const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf('//sky-static.mavi.com/sys-master/maviTrImages/') + 46)

            return {
                title: 'mavi '+ productDesc.replace(/\n/g,'')+' '+productTitle.replace(/\n/g,''),
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'mavi',
                category:_category,
              //  subcategory:_subcategory,
                node: _node
            }
        })
    },subcategory,category,node);
        console.log('data length_____', data.length)
        const nextPageExists = await page.$('.button.more-product')
        debugger;
        if (nextPageExists && start) {


            const nextPage = `${url}?page=2`
            const requestQueue = await Apify.openRequestQueue();

            requestQueue.addRequest({ url: nextPage, userData: { start: false, subcategory,category} })
        } else if (nextPageExists && !start) {

            const pageUrl = url.slice(0, url.lastIndexOf("=") + 1)
            const pageNumber = parseInt(url.substr(url.lastIndexOf("=") + 1)) + 1

            const nextPage = pageUrl + pageNumber
            const requestQueue = await Apify.openRequestQueue();

            requestQueue.addRequest({ url: nextPage, userData: { start: false, subcategory,category } })

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
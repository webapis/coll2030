const Apify = require('apify');
async function handler(page, context) {

    const { request: { userData: { start,  subcategory, category } } } = context
    const url = await page.url()

    debugger;//
    await page.waitForSelector('.prd-list .prd')
    debugger;
    const data = await page.evaluate((_subcategory,_category) => {
  
        const items = Array.from(document.querySelectorAll('.prd-list .prd'))
        return items.map(item => {

            const priceNew = item.querySelector('.prd-list .prd-price .urunListe_satisFiyat') && item.querySelector('.prd-list .prd-price .urunListe_satisFiyat').textContent.replace('\n', '').replace('₺', '').trim()

            debugger;
       
            const longlink =item.querySelector('a.prd-lnk.clicked-item')&& item.querySelector('a.prd-lnk.clicked-item').href
            const link =longlink&& longlink.substring(longlink.indexOf('https://www.ipekyol.com.tr/')+27)
            const longImgUrl =  item.querySelector('[data-image-src]') && item.querySelector('[data-image-src]').getAttribute('data-image-src')
            const imageUrlshort = longImgUrl&& longImgUrl.substring(longImgUrl.indexOf('https://img2-ipekyol.mncdn.com/mnresize/')+40)
            return {
                title: item.querySelector('.prd-name').innerText,
        
                priceNew,
  
                imageUrl:imageUrlshort,
                link,
     
                timestamp: Date.now(),
      
                marka: 'ipekyol',
                subcategory:_subcategory,
                category:_category


            }
        })//.filter(f => f.imageUrl !== null)
    },subcategory, category )

    console.log('data length_____', data.length)
    const nextPageExists = await page.$('.btnDefault.load-next')
    debugger;
    if (nextPageExists && start) {


        const nextPage = `${url}?page=2`
        const requestQueue = await Apify.openRequestQueue();
        debugger;
        requestQueue.addRequest({ url: nextPage, userData: { start: false, subcategory, category } })
    } else if (nextPageExists && !start) {
        debugger;
        const pageUrl = url.slice(0, url.lastIndexOf("=") + 1)
        const pageNumber = parseInt(url.substr(url.indexOf("=") + 1)) + 1
        const nextPage = pageUrl + pageNumber
        const requestQueue = await Apify.openRequestQueue();
        debugger;
        requestQueue.addRequest({ url: nextPage, userData: { start: false, subcategory, category} })

    }

    console.log('data length_____', data.length, 'url:', url)
    return data
}

async function getUrls(page, param) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}
module.exports = { handler, getUrls }
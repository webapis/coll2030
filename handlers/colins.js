
async function handler(page, context) {
    const { request: { userData: { subcategory, category,node } } } = context
    debugger;
    const url = await page.url()

    await page.waitForSelector('.module-content.product-list.clearfix')

    await autoScroll(page)
    debugger;


    const data = await page.$$eval('.productbox.clearfix.list-item', (productCards, _subcategory, _category,_node) => {
        return productCards.map(productCard => {
            const title = productCard.querySelector('.lazy-image.product-name.track-link').getAttribute('title')
            const img= productCard.querySelector('.lazy-image.product-name.track-link img').src
            const priceNew =productCard.querySelector('.product-price')?productCard.querySelector('.product-price').innerHTML.replace('TL','').trim() :productCard.querySelector('.product-new-price').innerHTML.replace('TL','').trim()
            const link = productCard.querySelector('.lazy-image.product-name.track-link').href

            return {
                title:'colins '+title,
                priceNew:priceNew,//.replace(',','.'),
                imageUrl: img.substring(img.indexOf('https://img-colinstr.mncdn.com/mnresize/')+40) ,
                link:link.substring(link.indexOf('https://www.colins.com.tr/')+26),
                timestamp: Date.now(),
                marka: 'colins',
                subcategory: _subcategory,
                category: _category,
                node: _node
            }
        })
    }, subcategory, category,node)
    console.log('data length_____', data.length, 'url:', url)
    return data

}





async function autoScroll(page) {
    await page.evaluate(async () => {


        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            let inc = 0
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                var toth = 7775
                window.scrollBy(0, distance);
                totalHeight += distance;
                inc = inc + 1
                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
}
async function getUrls(page) {

    const pageUrls = []


    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }


/*

async function handler(page, context) {
    const { request: { userData: { subcategory, category } } } = context
    debugger;
    const url = await page.url()

    await page.waitForSelector('.toolbar-amount')
    const totalItems = await page.$eval('.toolbar-amount', element => parseInt(element.textContent.replaceAll('\n', '').trim().replace(/[^\d]/g, '')))
    debugger;
    return new Promise((resolve, reject) => {
        try {
            let inv = setInterval(async () => {
                const totalLoaded = await page.$$eval('.item.product.product-item', elements => elements.length)
                debugger;
                if (totalLoaded < totalItems) {
                    debugger;
                  
                    await autoScroll(page)
                    debugger;
                } else {
                    debugger;
                    clearInterval(inv)
                    const data = await page.$$eval('.product-item', (productCards, _subcategory, _category, _opts) => {
                        return productCards.map(productCard => {
                            const title = productCard.querySelector('.product-image-photo').alt
                            const img= productCard.querySelector('.product-image-photo').src
                            const priceNew =productCard.querySelector('.special-price span')?productCard.querySelector('.special-price span').innerHTML.replace('₺',''): productCard.querySelector('.price.parent').innerHTML.replace('₺','')
                            const link = productCard.querySelector('.product.photo.product-item-photo').href

                            return {
                                title,
                                priceNew,
                                imageUrl: img,
                                link,
                                timestamp: Date.now(),
                                marka: 'dagi',
                                subcategory: _subcategory,
                                category: _category
                            }
                        })
                    }, subcategory, category)
                    console.log('data length_____', data.length, 'url:', url)
                    return resolve(data)

                }

            }, 3000)
        } catch (error) {
            return reject(error)
        }
    })
}
*/
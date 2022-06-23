

async function handler(page, context) {
    const { request: { userData: { subcategory, category, start } } } = context
    debugger;
    const url = await page.url()
    await page.waitForSelector('#ProductPageProductList')
    await autoScroll(page);
    await page.waitForSelector('.resimOrginal')
    debugger;
    const data = await page.$$eval('#ProductPageProductList .productItem', (productCards, _subcategory, _category) => {
        return productCards.map(productCard => {


            const title = productCard.querySelector('.productName a[title]').getAttribute('title').trim()
            const priceNew = productCard.querySelector('.discountPrice span').innerText.replace('₺','').trim()
            const longlink = productCard.querySelector('.detailLink.detailUrl').href
          const link = longlink.substring(longlink.indexOf('https://www.dilekhanif.com/') + 27)
         const longImgUrl =productCard.querySelector('.resimOrginal')&& productCard.querySelector('.resimOrginal').src
          const imageUrlshort =longImgUrl&& longImgUrl.substring(longImgUrl.indexOf('https://www.dilekhanif.com/Uploads/UrunResimleri/thumb/') + 55)

            return {
                title,
                priceNew,
                imageUrl: imageUrlshort,
                link,
                timestamp: Date.now(),
                marka: 'dilekhanif',
                subcategory: _subcategory,
                category: _category
            }
        }).filter(f => f.imageUrl !== null)
    }, subcategory, category)

    console.log('data length_____', data.length, 'url:', url)



debugger;
    return data
}

async function getUrls(page) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
module.exports = { handler, getUrls }
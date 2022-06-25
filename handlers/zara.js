

async function handler(page, context) {
    const { request: { userData: { subcategory, category, start } } } = context
    debugger;
    const url = await page.url()
  
    debugger;
    await page.waitForSelector('.product-grid-block-dynamic.product-grid-block-dynamic__container')
    await autoScroll(page);
    debugger;

    await page.waitFor(3000)
    debugger;
    const data = await page.$$eval('.product-grid-block-dynamic.product-grid-block-dynamic__container', (productCards, _subcategory, _category) => {
        return productCards.map(productCard => {


            const title =productCard.querySelector('.product-link._item.product-grid-product-info__name.link span')&& productCard.querySelector('.product-link._item.product-grid-product-info__name.link span').textContent.trim()
            // const priceNew = productCard.querySelector('.discountPrice span').innerText.replace('₺', '').trim()
            // const longlink = productCard.querySelector('.detailLink.detailUrl').href
            // const link = longlink.substring(longlink.indexOf('https://www.dilekhanif.com/') + 27)
            // const longImgUrl = productCard.querySelector('.productImage.productImageOwlSlider')?productCard.querySelector('.productSliderImage').src : (productCard.querySelector('.resimOrginal').src ?productCard.querySelector('.resimOrginal').src :productCard.querySelector('.resimOrginal').getAttribute('data-original')  )
            // const imageUrlshort = longImgUrl && longImgUrl.substring(longImgUrl.indexOf('https://www.dilekhanif.com/Uploads/UrunResimleri/thumb/') + 55)
//data-original
            return {
              title,
            //    priceNew,
             //   imageUrl: imageUrlshort,
             //   link,
                timestamp: Date.now(),
                marka: 'zara',
                subcategory: _subcategory,
                category: _category
            }
        })
    }, subcategory, category)

    console.log('data length_____', data.length, 'url:', url)



    debugger;
    return data
}

async function getUrls(page) {

    return { pageUrls: [], productCount: 0, pageLength: 0 }
}

async function autoScroll(page) {
    await page.evaluate(async () => {


        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            let inc = 0
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
 
                window.scrollBy(0, distance);
                totalHeight += distance;
                inc = inc + 1
                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    });
}
module.exports = { handler, getUrls }

//ul.product-grid-block-dynamic__row

// title .querySelector('.product-link._item.product-grid-product-info__name.link span').textContent 
// price .querySelectorAll('.price-current__amount')
// image .querySelector('.media-image__image.media__wrapper--media').src
// detail .querySelector('.product-link.product-grid-product__link.link').href

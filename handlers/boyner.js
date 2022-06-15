async function handler(page) {
    const url = await page.url()
    await page.waitForSelector('.productList .product-list-item')

    const data = await page.$$eval('.productList .product-list-item', (productCards) => {
        return productCards.map(productCard => {

          const imageUrl = productCard.querySelector('.product-img img').getAttribute('data-original')
          const title= productCard.querySelector('.product-name').innerText
          const priceNew= productCard.querySelector('.price-payable') && productCard.querySelector('.price-payable').innerText.replace('TL','').trim()
          const longlink =productCard.querySelector('.product-figure-wrap a').href
          const link = longlink.substring(longlink.indexOf('https://www.boyner.com.tr/')+26)
          const longImgUrl = imageUrl&&  productCard.querySelector('.product-img img').getAttribute('data-original')
          const imageUrlshort = longImgUrl.substring(longImgUrl.indexOf('https://statics.boyner.com.tr/mnresize/325/451/productimages/')+61)
          debugger;
            return {
                title,
                priceNew,
                imageUrl: imageUrlshort,
                link,   
                timestamp: Date.now(),
                marka:'boyner'

            }
        }).filter(f => f.imageUrl !== null)
    })
debugger;
    console.log('data length_____', data.length, 'url:', url)
  


      return data
}

async function getUrls(page) {

    await page.waitForSelector('.red-v1 .grey')
    const firstUrl =await page.url()
    
    const productCount = await page.$eval('.red-v1 .grey', element => parseInt(element.innerText.replace(/[^0-9]/g,'')))
    const totalPages = Math.ceil(productCount / 45)
    const pageUrls = []
    let pagesLeft = totalPages
  const commonURL = firstUrl.substring(0,firstUrl.lastIndexOf('='))

    for (let i = 2; i <= totalPages; i++) {
        const url = `${commonURL}=${i}`

      
        if (pagesLeft >= 1) {
            pageUrls.push(url)
            --pagesLeft
        }
    }


 return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
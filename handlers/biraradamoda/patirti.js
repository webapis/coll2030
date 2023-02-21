const { formatMoney } = require('accounting-js')

async function handler(page, context) {
    const { request: { userData: { } } } = context

    const url = await page.url()

    await page.waitForSelector('#Katalog')

    return new Promise((resolve, reject) => {
        try {
            let counter = 0
            let inv = setInterval(async () => {

                const hasNoMoreProduct = false

                if (hasNoMoreProduct) {

                    clearInterval(inv)
                    debugger
                    const data = await page.$$eval('.productItem', (productCards, _subcategory, _category, _opts, _node) => {
                        return productCards.map(productCard => {
                            const priceNew = productCard.querySelector('.currentPrice') ? productCard.querySelector('.currentPrice').textContent.replace(/\n/g, '').replace('₺', '').trim() : productCard.querySelector('.addPriceDiscount span').textContent.replace('₺', '').trim()
                            const longlink = productCard.querySelector('a.fl').href
                            const link = longlink.substring(longlink.indexOf("https://www.patirti.com/") + 24)
                            const longImgUrl = productCard.querySelector('img').src ? productCard.querySelector('img').src : productCard.querySelector('img[data-bind]').src
                            const imageUrlshort = longImgUrl && longImgUrl.substring(longImgUrl.indexOf("https://images.patirti.com/") + 27)
                            const title = productCard.querySelector('m[data-bind]').innerHTML
                            return {
                                title: 'patirti ' + title.replace(/İ/g, 'i').toLowerCase(),
                                priceNew,
                                imageUrl: imageUrlshort, // imageUrlshort,
                                link,

                                timestamp: Date.now(),

                                marka: 'patirti',



                            }
                        })
                    })
                    console.log('data length_____', data.length, 'url:', url)
                    debugger;
                    const formatprice = data.map((m) => {
                        return { ...m, priceNew: formatMoney(parseFloat(m.priceNew), { symbol: "", precision: 2, thousand: ".", decimal: "," }) }
                    })

                    debugger
                    return resolve(formatprice.map(m => { return { ...m, title: m.title + " _" + process.env.GENDER } }))

                } else {
                    if (counter < 100) {
                        await manualScroll(page)
                        hasNoMoreProduct = await page.evaluate(() => document.querySelector('.noMoreProducts').style.display !== 'none')
                    } else {
                        hasNoMoreProduct = true
                    }

                }

            }, 150)
        } catch (error) {
            debugger
            return reject(error)
        }
    })
}





async function manualScroll(page) {
    await page.evaluate(async () => {
        var totalHeight = 0;
        var distance = 150;
        let inc = 0
        window.scrollBy(0, distance);
        totalHeight += distance;
        inc = inc + 1
    });
}

async function getUrls(page) {

    const pageUrls = []



    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
// const { formatMoney } = require('accounting-js')

// async function handler(page, context) {
//     const { request: { userData: {} } } = context
//     debugger;


//     const url = await page.url()

//     debugger;

//     await page.waitForSelector('#Katalog')
//     await autoScroll(page);

//     debugger
//     const data = await page.$$eval('.productItem', (productCards, _subcategory, _category, _opts,_node) => {
//         return productCards.map(productCard => {
//             const priceNew = productCard.querySelector('.currentPrice') ? productCard.querySelector('.currentPrice').textContent.replace(/\n/g, '').replace('₺', '').trim() : productCard.querySelector('.addPriceDiscount span').textContent.replace('₺', '').trim()
//             const longlink = productCard.querySelector('a.fl').href
//         const link = longlink.substring(longlink.indexOf("https://www.patirti.com/") + 24)
//             const longImgUrl =productCard.querySelector('img').src ? productCard.querySelector('img').src :productCard.querySelector('img[data-bind]').src
//         const imageUrlshort = longImgUrl&&  longImgUrl.substring(longImgUrl.indexOf("https://images.patirti.com/") + 27)
//         const title = productCard.querySelector('m[data-bind]').innerHTML
//             return {
//                 title: 'patirti ' + title.replace(/İ/g,'i').toLowerCase(),
//                 priceNew,
//                 imageUrl:imageUrlshort, // imageUrlshort,
//                 link,

//                 timestamp: Date.now(),

//                 marka: 'patirti',



//             }
//         })
//     })



//     //----------

//     console.log('data length_____', data.length, 'url:', url)



//     debugger;
//     const formatprice= data.map((m) => {
//         return { ...m, priceNew: formatMoney(parseFloat(m.priceNew), { symbol: "", precision: 2, thousand: ".", decimal: "," }) }
//     })


//     return formatprice.map(m=>{return {...m,title:m.title+" _"+process.env.GENDER }})

// }

// async function getUrls(page) {

//     return { pageUrls: [], productCount: 0, pageLength: 0 }
// }

// async function autoScroll(page) {

//     await page.evaluate(async () => {


//         await new Promise((resolve, reject) => {
//             var totalHeight = 0;
//             var distance = 100;
//             let inc = 0
//             var timer = setInterval(async () => {

//                 var scrollHeight = document.body.scrollHeight;

//                 window.scrollBy(0, distance);
//                 totalHeight += distance;
//                 inc = inc + 1

//                 if (totalHeight >= scrollHeight - window.innerHeight) {
//                     clearInterval(timer);
//                     resolve(true);
//                 }
//             }, 150);
//         });
//     });
// }
// module.exports = { handler, getUrls }


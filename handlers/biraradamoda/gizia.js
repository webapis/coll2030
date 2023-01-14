const { formatMoney } = require('accounting-js')
async function handler(page, context) {
    const { request: { userData: {  } } } = context

    const url = await page.url()
    debugger

    debugger
    await page.waitForSelector(".drop-down-title")
    debugger
    const el = await page.$('.drop-down-title')
    await el.hover()
        const exits =await page.$("li.drop-down-item[data-value='TL']")
        if(exits){
            await page.click("li.drop-down-item[data-value='TL']")
            await page.waitForNavigation()
        }


    await page.waitForSelector('#category-list')

    const products = await page.evaluate(() => window.PRODUCT_DATA)

    debugger;
  
    const data = products.map(product => {

        const longImage = product.image
        const title = product.name
        const priceNew = product.total_sale_price//.toString().replace('.', '').replace(',', '.').trim()//.replace(',','').replace('.00','').trim()
        const link = product.url

        return {
            title: 'gizia ' + title.replace(/İ/g,'i').toLowerCase()+" _"+process.env.GENDER,
            priceNew:formatMoney(priceNew, { symbol: "", precision: 2, thousand: ".", decimal: "," }),
            imageUrl: longImage.substring(longImage.indexOf('https://pic.gizia.com/') + 22),
            link,
            timestamp: Date.now(),
            marka: 'gizia',

        }
    })


    console.log('data length_____', data.length, 'url:', url)


    return data.map(m=>{return {...m,title:m.title+" _"+process.env.GENDER }})
}

async function getUrls(page) {
    debugger
    const url = await page.url()
 
 
    debugger
    await page.waitForSelector('.productPager')

    const totalPages = await page.evaluate(()=>Array.from(document.querySelectorAll('.productPager a[href*="?pg="]')).map(e=>parseInt( e.href.substring(e.href.lastIndexOf('pg=')+3))).sort(function (a, b) {  return a - b;  }).reverse()[0])
    debugger
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {



        pageUrls.push(`${url}?pg=` + i)
        --pagesLeft


    }

    return { pageUrls, productCount: 0, pageLength: pageUrls.length + 1 }
}
module.exports = { handler, getUrls }
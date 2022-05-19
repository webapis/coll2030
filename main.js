
console.log('main.js is loading...')
require('dotenv').config()
var TAFFY = require('taffy');
const { getGoogleToken } = require('./google/google.oauth')
const fs = require('fs')
const { navTree } = require('./navTree')
const { getSheetValues, setSheetValue, appendSheetValues } = require('./google.sheet.js')

const Apify = require('apify');

console.log('PROD BRANCH IS MERGED TO MASTER...........????????.......+++++++++------========333333')

fs.writeFileSync('helloworld.txt', new Date().toDateString())

Apify.main(async () => {
    const startDate = new Date().toLocaleDateString()
    console.log('apify.main.js is loading...')

    const google_access_token = await getGoogleToken(process.env.GOOGLE_REFRESH_TOKEN)


    const { utils: { log } } = Apify;
    const requestQueue = await Apify.openRequestQueue();
    //const urlsData = await getSheetValues({ access_token: google_access_token, spreadsheetId: '1TVFTCbMIlLXFxeXICx2VuK0XtlNLpmiJxn6fJfRclRw', range: 'URLS!A:B' })


    const marka = process.env.START_URL.match(/(?<=www.).*(?=.com)/g)[0]
    await requestQueue.addRequest({ url: process.env.START_URL, userData: { start: true, gender: 'kadin', marka } })


    const sheetDataset = await Apify.openDataset(`categorySheet`);
    const productsDataset = await Apify.openDataset(`products`);
    const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId: '1TVFTCbMIlLXFxeXICx2VuK0XtlNLpmiJxn6fJfRclRw', range: 'categories!A:C' })

    console.log('sheetData', sheetData)

    for (let value of sheetData.values.filter((c, i) => i > 0)) {
        const subcategory = value[0]
        const category = value[1]
        const regex = value[2]
        await sheetDataset.pushData({ subcategory, category, regex })
    }


    process.env.dataLength = 0
    const handlePageFunction = async (context) => {

        const { page, request: { userData: { start, gender, marka } } } = context

        const { handler, getUrls } = require(`./handlers/${marka}`);
        const { pageUrls, productCount, pageLength } = await getUrls(page)
        process.env.productCount = productCount

        if (start) {
            let order = 1
            for (let url of pageUrls) {
                if (pageUrls.length === order) {
                    requestQueue.addRequest({ url, userData: { start: false, gender, marka } })
                } else {
                    requestQueue.addRequest({ url, userData: { start: false, gender, marka } })
                }
                ++order;
            }
        }

        const dataCollected = await handler(page, context)
        const categoryData = await sheetDataset.getData()
        const google_access_token1 = await getGoogleToken(process.env.GOOGLE_REFRESH_TOKEN)
        const currentDate = new Date().toLocaleDateString()

        const categoryItems = categoryData.items
        const map1 = dataCollected.map((p, i) => {
            const procutTitle = p.title

            const productCategory = categoryItems.find(c => {
                const regexvar = "" + c.subcategory + ""
                const reg = new RegExp(regexvar, "i")
                const result = reg.test(procutTitle.toLowerCase())

                return result
            })

            if (productCategory) {
                return { ...p, category: productCategory.category, subcategory: productCategory.regex }
            } else {
                return { ...p, category: "undefined", subcategory: "undefined" }
            }
        })
        console.log('map1.length', map1.length)





        await productsDataset.pushData(map1)



        console.log('uploading to excell....')

        const table = map1.reduce((group, product) => {
            const values = Object.values(product)



            group.push(values);
            return group;
        }, []);

        let colResulValues = []



        const response = await appendSheetValues({ access_token: google_access_token1, spreadsheetId: '12mKtqxu5A-CVoXP_Kw36JxKiC69oPUUXVQmm7LUfh3s', range: 'DATA!A:B', values: table })


        if (gender === 'FEMALE') {

            //  const response= await appendSheetValues({ access_token: google_access_token1, spreadsheetId: '12mKtqxu5A-CVoXP_Kw36JxKiC69oPUUXVQmm7LUfh3s', range: 'DATA!A:B', values: table })

        }

        console.log('uploading to excell complete....')

        //  console.log('items...', map2.length);
        process.env.dataLength = parseInt(process.env.dataLength) + map1.length
        console.log('process.env.dataLength', process.env.dataLength)

    }

    const crawler = new Apify.PuppeteerCrawler({
        //requestList,
        requestQueue,
        maxConcurrency: 10,
        launchContext: {
            // Chrome with stealth should work for most websites.
            // If it doesn't, feel free to remove this.
            // useChrome: true,
            launchOptions: {
                headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', "--disable-web-security",
                    `--window-size=1200,1250`,
                    "--allow-insecure-localhost",
                    //  "--user-data-dir=/tmp/foo",
                    "--ignore-certificate-errors",
                    "--unsafely-treat-insecure-origin-as-secure=https://localhost:8888",
                    '--disable-gpu-rasterization',
                    '--disable-low-res-tiling',
                    '--disable-skia-runtime-opts',
                    '--disable-yuv420-biplanar'
                ]
            }

        },
        handlePageFunction,
        preNavigationHooks: [
            async (crawlingContext, gotoOptions) => {
                const { page } = crawlingContext;
                await page.setDefaultNavigationTimeout(0);
                await page.setRequestInterception(true);
                page.on('request', req => {
                    const resourceType = req.resourceType();
                    if (resourceType === 'image') {
                        req.respond({
                            status: 200,
                            contentType: 'image/jpeg',
                            body: ''
                        });


                    } else {
                        req.continue();
                    }
                });
            },
        ],
        handleFailedRequestFunction: async ({ request: { errorMessages, url, userData: { gender, start } } }) => {
            const google_access_token1 = await getGoogleToken(process.env.GOOGLE_REFRESH_TOKEN)
            if (gender === 'MALE') {

                const response = await appendSheetValues({ access_token: google_access_token1, spreadsheetId: '1IeaYAURMnrbZAsQA_NO_LA_y_qq8MmwxjSo854vz5YM', range: 'ERROR!A:B', values: [[url, errorMessages[0].substring(0, 150), gender, start]] })

            }
            if (gender === 'FEMALE') {

                const response = await appendSheetValues({ access_token: google_access_token1, spreadsheetId: '12mKtqxu5A-CVoXP_Kw36JxKiC69oPUUXVQmm7LUfh3s', range: 'ERROR!A:B', values: [[url, errorMessages[0].substring(0, 150), gender, start]] })

            }
            // This function is called when the crawling of a request failed too many times


        },
    });


    log.info('Starting the crawl.');
    await crawler.run();
    const { items } = await productsDataset.getData()

    debugger;
    const data = require('./api/_files/kadin/data.json')
    const ordereditemOrder = order([...items, ...data])

    debugger;

    navTree(ordereditemOrder)
    debugger;
    //save data to jsson
    fs.unlinkSync(`./api/_files/kadin/data.json`)
    debugger;
    fs.appendFileSync(`./api/_files/kadin/data.json`, JSON.stringify(ordereditemOrder))

    debugger;


    console.log('Crawl finished.');

});


function order(items) {
debugger;
    const groupByMarka =items.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.imageUrl === value.imageUrl 
    ))
  ).sort((a, b) => (a.subcategory > b.subcategory) ? 1 : -1).reduce((group, product) => {
        const { marka } = product;
        group[marka] = group[marka] ?? [];
        group[marka].push(product);
        return group;
    }, {});

    const groupbysub = {}

    for (let c in groupByMarka) {
        const current = groupByMarka[c]

        groupbysub[c] = {
            total: current.length, subcategories: current.reduce((group, product) => {
                const { subcategory } = product;

                group[subcategory] = group[subcategory] ?? [];
                group[subcategory].push(product);
                return group;
            }, {})
        }



    }




    const addItemOrder = {}
    for (let c in groupbysub) {
        const { subcategories } = groupbysub[c]
        addItemOrder[c] = {}
        for (let s in subcategories) {

            addItemOrder[c][s] = []

            const current = subcategories[s].map((sk, i) => { return { ...sk, itemOrder: i } })

            addItemOrder[c][s] = current


        }


    }

    let flatten = []

    for (let c in addItemOrder) {

        const current = addItemOrder[c]

        for (let s in current) {


            const currents = current[s]

            flatten.push(...currents)


        }


    }

    return flatten
}



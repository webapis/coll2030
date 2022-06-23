
require('dotenv').config()
const { getGoogleToken } = require('./google/google.oauth')
const fs = require('fs')
const { getSheetValues, appendSheetValues } = require('./google.sheet.js')
const makeDir = require('make-dir');
const Apify = require('apify');


Apify.main(async () => {


    const { utils: { log } } = Apify;
    const requestQueue = await Apify.openRequestQueue();
    const marka = process.env.marka// process.env.START_URL.match(/(?<=www.).*(?=.com)/g)[0]
    const {urls} = require(`./urls/${marka}`)
    
    for (let obj of urls) {
        
        const { url, category, subcategory } = obj

        await requestQueue.addRequest({ url, userData: { start: true, category, subcategory } })
    }



    const productsDataset = await Apify.openDataset(`products`);

    

    process.env.dataLength = 0
    const handlePageFunction = async (context) => {

        const { page, request: { userData: { start, subcategory, category } } } = context
        
        const marka = process.env.marka
        const { handler, getUrls } = require(`./handlers/${process.env.marka}`);
        const { pageUrls, productCount, pageLength } = await getUrls(page)
        process.env.productCount = productCount

        if (start) {
            let order = 1
            for (let url of pageUrls) {
                if (pageUrls.length === order) {
                    requestQueue.addRequest({ url, userData: { start: false, subcategory, category } })
                } else {
                    requestQueue.addRequest({ url, userData: { start: false, subcategory, category } })
                }
                ++order;
            }
        }

        const dataCollected = await handler(page, context)
        const mapMarka = dataCollected.map(m => {
            return { ...m, title: marka + ' ' + m.title }
        })


        await productsDataset.pushData(mapMarka)

        process.env.dataLength = parseInt(process.env.dataLength) + dataCollected.length

        console.log('total collected', process.env.dataLength)
    }

    const crawler = new Apify.PuppeteerCrawler({
       // requestList,
       requestQueue,
        maxConcurrency: 2,
        launchContext: {
            // Chrome with stealth should work for most websites.
            // If it doesn't, feel free to remove this.
            // useChrome: true,
            launchOptions: {
                headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox', "--disable-web-security",
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
            const google_access_token1 = await getGoogleToken()
            await appendSheetValues({ access_token: google_access_token1, spreadsheetId: '1IeaYAURMnrbZAsQA_NO_LA_y_qq8MmwxjSo854vz5YM', range: 'ERROR!A:B', values: [[url, errorMessages[0].substring(0, 150), gender, start]] })


        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    const { items: productItems } = await productsDataset.getData();

    await makeDir('data');

    if (fs.existsSync(`data/${marka}.json`)) {
        fs.unlinkSync(`data/${marka}.json`)
    }

    fs.appendFileSync(`data/${marka}.json`, JSON.stringify(productItems));


    console.log('Crawl finished.');

});



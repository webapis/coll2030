
require('dotenv').config()
const { getGoogleToken } = require('./google/google.oauth')
const fs = require('fs')
const { getSheetValues, appendSheetValues } = require('./google.sheet.js')
const makeDir = require('make-dir');
const Apify = require('apify');


Apify.main(async () => {

    //  const google_access_token = await getGoogleToken()


    const { utils: { log } } = Apify;
    const requestQueue = await Apify.openRequestQueue();

    const marka = process.env.START_URL.match(/(?<=www.).*(?=.com)/g)[0]
    await requestQueue.addRequest({ url: process.env.START_URL, userData: { start: true, gender: 'kadin', marka } })

    const sheetDataset = await Apify.openDataset(`categorySheet`);
    const productsDataset = await Apify.openDataset(`products`);
    //  const productsNavDataset = await Apify.openDataset(`productsnav`);
    // const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId: '1TVFTCbMIlLXFxeXICx2VuK0XtlNLpmiJxn6fJfRclRw', range: 'categoriestest!A:C' })

    //  console.log('sheetData.......', sheetData)
    debugger;

    // for (let value of sheetData.values.filter((c, i) => i > 0)) {
    //     const subcategory = value[0]
    //     const category = value[1]
    //     const regex = value[2]
    //     await sheetDataset.pushData({ subcategory, category, regex })
    // }


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
        const mapMarka = dataCollected.map(m => {
            return { ...m, title: marka + ' ' + m.title }
        })
       // const categoryData = await sheetDataset.getData()
      //  const google_access_token1 = await getGoogleToken()

        // const categoryItems = categoryData.items

        await productsDataset.pushData(mapMarka)

        // const table = map2.reduce((group, product) => {
        //     const values = Object.values(product)
        //     group.push(values);
        //     return group;
        // }, []);

        console.log('uploading to excell complete....', process.env.dataLength)

        //  await appendSheetValues({ access_token: google_access_token1, spreadsheetId: '12mKtqxu5A-CVoXP_Kw36JxKiC69oPUUXVQmm7LUfh3s', range: 'DATA!A:B', values: table })

        process.env.dataLength = parseInt(process.env.dataLength) + dataCollected.length


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
            const google_access_token1 = await getGoogleToken()
            await appendSheetValues({ access_token: google_access_token1, spreadsheetId: '1IeaYAURMnrbZAsQA_NO_LA_y_qq8MmwxjSo854vz5YM', range: 'ERROR!A:B', values: [[url, errorMessages[0].substring(0, 150), gender, start]] })


        },
    });

    log.info('Starting the crawl.');
    await crawler.run();
    const { items: productItems } = await productsDataset.getData();
    // const { items: productNavItems } = await productsNavDataset.getData();
    await makeDir('data');
    //  await makeDir('data-nav')
    if (fs.existsSync(`data/${marka}.json`)) {
        fs.unlinkSync(`data/${marka}.json`)
    }
    // if (fs.existsSync(`data-nav/${marka}.json`)) {
    //     fs.unlinkSync(`data-nav/${marka}.json`)
    // }
    fs.appendFileSync(`data/${marka}.json`, JSON.stringify(productItems));
    //  fs.appendFileSync(`data-nav/${marka}.json`, JSON.stringify(productNavItems));

    console.log('Crawl finished.');

});



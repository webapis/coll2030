

(async () => {

    const fetch = require('node-fetch')
    const fs = require('fs')
    const makedir = require('make-dir')
    const path = require('path')
    const { commonDataHandler } = require('./netlify/functions/commonDataHandler')
    const { commonNavHandler } = require('./netlify/functions/commonNavHandler')
    const keywordsfromexcell = require('./api/_files/nav/keywords.json')

    const objectify = {}

    for (let o of keywordsfromexcell) {
        objectify[o.index] = o


    }
    debugger
    const { getGoogleToken } = require(`${process.cwd()}/google/google.oauth`)
    const { getSheetValues } = require(`${process.cwd()}/google.sheet.js`)
    const google_access_token = await getGoogleToken()
    const spreadsheetId = '1A4FWttdgPq2kaT2fr_Z0ke3ETfK8ndjiyEc7nvJ4xHk'
    const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId, range: 'modaburada!A:G' })
    const categoryItems = []
    debugger
    for (let value of sheetData.values.filter((c, i) => i > 0)) {
        const productName = value[0]
        //  const exact = value[1]
        //   const exclude = value[2]
        const fn = value[3]
        // const groupDescription = value[4]
        const sort = value[5]
        const group = value[6]
        categoryItems.push({ productName: productName.toLowerCase(), fn, group, sort, group })
    }
    const placeholder = ''
    const imagePrefixCloudinary = 'https://res.cloudinary.com/codergihub/image/fetch/w_200/'
    const imagePrefixImageKit = 'https://ik.imagekit.io/mumrjdehaou/'
    const placeholders = {
        defacto: { logo: { image: './logo/defacto.svg', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://dfcdn.defacto.com.tr/', detailHost: 'https://www.defacto.com.tr/', postfix: '', imgPostFix: '' },
        koton: { logo: { image: './logo/koton.webp', width: '80', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://ktnimg2.mncdn.com/', detailHost: 'https://www.koton.com/', postfix: '', imgPostFix: '?tr=w-400' },
        boyner: { logo: { image: "./logo/boyner.svg", width: '29%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://statics.boyner.com.tr/mnresize/325/451/productimages/', detailHost: 'https://www.boyner.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        ipekyol: { logo: { image: './logo/ipekyol.svg', width: '23%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img2-ipekyol.mncdn.com/mnresize/', detailHost: 'https://www.ipekyol.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        machka: { logo: { image: './logo/machka.svg', width: '35%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://image.machka.com.tr/unsafe/660x0/10.116.1.50:8000//Machka/products/', detailHost: 'https://www.machka.com.tr/urun/', postfix: '', imgPostFix: '' },
        lcwaikiki: { logo: { image: './logo/lcwaikiki.svg', width: '80', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img-lcwaikiki.mncdn.com/', detailHost: 'https://www.lcwaikiki.com/', postfix: '', imgPostFix: '' },
        mavi: { logo: { image: './logo/mavi.svg', width: '18%', height: 10 }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://sky-static.mavi.com/sys-master/maviTrImages/', detailHost: 'https://www.mavi.com/', postfix: '', imgPostFix: '?tr=w-400' },
        adl: { logo: { width: 'auto', heigth: '20', image: './logo/adl.jpg' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://lmb-adl.akinoncdn.com/products/', detailHost: 'https://www.adl.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        penti: { logo: { image: './logo/penti.svg', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://file-penti.mncdn.com/mnresize/', detailHost: 'https://www.penti.com/tr/', postfix: '', imgPostFix: '' },
        roman: { logo: { image: './logo/roman.png', width: '80', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://romancdn.sysrun.net/Content/ProductImage/Original/', detailHost: 'https://www.roman.com.tr/detay/', postfix: '', imgPostFix: '' },
        beymen: { logo: { image: './logo/beymen.svg', width: '45%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.beymen.com/mnresize/', detailHost: 'https://www.beymen.com/', postfix: '', imgPostFix: '?tr=w-400' },
        vakko: { logo: { image: './logo/vakko.jpg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://vakko.akinoncdn.com/products/', detailHost: 'https://www.vakko.com/', postfix: '', imgPostFix: '?tr=w-400' },
        zara: { logo: { image: './logo/zara.jpg', width: '15%', height: '' }, imagePrefix: '', placeholder, imageHost: 'https://static.zara.net/photos/', detailHost: 'https://www.zara.com/tr/tr/', postfix: '', imgPostFix: '' },
        twist: { logo: { image: './logo/twist.svg', width: '15%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img2-twist.mncdn.com/', detailHost: 'https://www.twist.com.tr/', postfix: '', imgPostFix: '' },
        hm: { logo: { image: './logo/hm.jpg', width: '30', height: 'auto' }, imagePrefix: '', placeholder, imageHost: 'http://lp2.hm.com/hmgoepprod?set=source[', detailHost: 'https://www2.hm.com/tr_tr/', postfix: '', imgPostFix: '' },
        adidas: { logo: { image: './logo/adidas.jpg', width: '28%', height: '' }, imagePrefix: '', placeholder, imageHost: 'https://assets.adidas.com/images/', detailHost: 'https://www.adidas.com.tr/tr/', postfix: '', imgPostFix: '' },
        baqa: { logo: { image: './logo/baqa.jpg', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.baqa.com.tr', detailHost: 'https://www.baqa.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        beyyoglu: { logo: { image: './logo/beyyoglu.svg', width: '45%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://beyyoglu.akinoncdn.com/products/', detailHost: 'https://www.beyyoglu.com/', postfix: '', imgPostFix: '?tr=w-400' },
        dogo: { logo: { image: './logo/dogo.svg', width: '25%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.dogostore.com/', detailHost: 'https://www.dogostore.com/', postfix: '', imgPostFix: '?tr=w-400' },
        dilvin: { logo: { image: './logo/dilvin.png', width: '50', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://kvyfm6d9dll6.merlincdn.net/productimages/', detailHost: 'https://www.dilvin.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        dagi: { logo: { image: './logo/dagi.png', width: '50', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img-dagi.mncdn.com/mnpadding/', detailHost: 'https://www.dagi.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        colins: { logo: { image: './logo/colins.png', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img-colinstr.mncdn.com/mnresize/', detailHost: 'https://www.colins.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        butigo: { logo: { image: './logo/butigo.jpg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://floimages.mncdn.com/mnpadding/', detailHost: 'https://www.butigo.com.tr', postfix: '', imgPostFix: '?tr=w-400' },
        faststep: { logo: { image: './logo/faststep.jpg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.faststep.com.tr?img=catalog/urunresim/', detailHost: 'https://www.faststep.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        fullamoda: { logo: { image: './logo/fullamoda.webp', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://images.farktorcdn.com/img/', detailHost: 'https://www.fullamoda.com/', postfix: '', imgPostFix: '?tr=w-400' },
        gizia: { logo: { image: './logo/gizia.svg', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://pic.gizia.com/', detailHost: 'https://www.gizia.com/', postfix: '', imgPostFix: '?tr=w-400' },
        vitrin: { logo: { image: './logo/vitrin.png', width: '30%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.vitrin.com.tr/', detailHost: 'https://www.vitrin.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        xint: { logo: { image: './logo/xint.png', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://xint.com.tr/', detailHost: 'https://xint.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        tozlu: { logo: { image: './logo/tozlu.svg', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img.tozlu.com/', detailHost: 'https://www.tozlu.com/', postfix: '', imgPostFix: '?tr=w-400' },

        quzu: { logo: { image: './logo/quzu.webp', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.quzu.com.tr/', detailHost: 'https://www.quzu.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        saygigiyim: { logo: { image: './logo/saygigiyim.webp', width: '20%', height: '' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.saygigiyim.com/', detailHost: 'https://www.saygigiyim.com/', postfix: '', imgPostFix: '?tr=w-400' },
        manuka: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.manuka.com.tr/', detailHost: 'https://www.manuka.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },

        kikiriki: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.vebigo.com/', detailHost: 'https://tr.kikiriki.com/', postfix: '', imgPostFix: '?tr=w-400' },
        jimmykey: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.sorsware.com/', detailHost: 'https://www.jimmykey.com/tr/', postfix: '', imgPostFix: '?tr=w-400' },
        perspective: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixCloudinary, imagePrefixImageKit, placeholder, imageHost: 'https://cdn.sorsware.com/', detailHost: 'https://www.perspective.com.tr/', postfix: '', imgPostFix: '' },
        mango: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://st.mngbcn.com/', detailHost: 'https://shop.mango.com/', postfix: '', imgPostFix: '?tr=w-400' },
        olegcassini: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.olegcassini.com.tr/', detailHost: 'https://www.olegcassini.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        addax: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn2.sorsware.com/', detailHost: 'https://www.addax.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        oxxo: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn.sorsware.com/', detailHost: 'https://www.oxxo.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        abiyefon: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://www.abiyefon.com/', detailHost: 'https://www.abiyefon.com/', postfix: '', imgPostFix: '?tr=w-400' },
        desa: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://cdn-ayae.akinon.net/', detailHost: 'https://www.desa.com.tr/', postfix: '', imgPostFix: '?tr=w-400' },
        patirti: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: '', detailHost: 'https://www.patirti.com/', postfix: '', imgPostFix: '?tr=w-400' },
        yargici: { logo: { image: './logo/manuka.webp', width: '40%', height: 'auto' }, imagePrefix: imagePrefixImageKit, placeholder, imageHost: 'https://img-incommerce-yargici.mncdn.com/', detailHost: 'https://www.yargici.com/', postfix: '', imgPostFix: '?tr=w-400' },

    }
    debugger
    const kewordImages = {}
    const imageIndexes = []
    for (let subcat of categoryItems) {

        const { fn, productName } = subcat
        debugger
        if (true) {


            debugger
            const keywordsRoot = commonNavHandler({ subcategory: fn, keyOrder: '0', navindex: '0-' })
            const s = keywordsRoot.keywords.filter(f => f[2] === productName)
            debugger
            if (s.length > 0) {
                const navIndex = s[0][1]

                const keyOrder = parseInt(navIndex.replace(/-/g, '').trim()) % 2

                const { keywords } = commonNavHandler({ subcategory: fn, keyOrder, navindex: navIndex })

                const mapKeywords = keywords.map((m) => {
                    const index = m[1].replace('-', '')

                    const { category, subcategory } = objectify[index]

                    return { total: m[0], index: m[1], keyword: m[2], category, subcategory }

                })

                const keywordsObj = {}
                if (kewordImages[navIndex] === undefined) {
                    kewordImages[navIndex] = {

                    }
                }

                const filteredKeywords = mapKeywords.filter(f => f.category !== 'Fiyat' && f.category !== 'Ürün' && f.category !== 'Marka')

                for (let n of filteredKeywords) {
                    const { total, index, keyword, category, subcategory } = n

                    if (keywordsObj[index] === undefined) {
                        keywordsObj[index] = {
                            total,
                            keyword,
                            category,
                            subcategory
                        }
                    }

                    const { d, count } = commonDataHandler({ start: 0, search: '', selectedNavIndex: index, subcategory: fn })
                    const filteredByProductName = d.filter(f => f.title.toLowerCase().includes(productName))
                    const random = randomIntFromInterval(0, filteredByProductName.length - 1)
                    debugger
                    if (filteredByProductName.length === 0 || filteredByProductName[random] === undefined) {
                        debugger

                    }
                    if (filteredByProductName.length === 0)
                        continue
                    const { marka, imageUrl, title } = filteredByProductName[random]
                    debugger
                    const imagePath = imagePrefixCloudinary + placeholders[marka].imageHost + imageUrl



                    const fileName = keyword + path.extname(imageUrl)
                    const filePath = path.join(process.cwd(), 'public/indexed-images', fn, productName, fileName)
                    makedir.sync(path.dirname(filePath))
                    if (fs.existsSync(filePath)) {
                       // const b64 = fs.readFileSync(filePath, { encoding: 'base64' })
                       // const ext = path.extname(filePath)
                        keywordsObj[index].imageSrc = fileName
                        keywordsObj[index].title = title
                        keywordsObj[index].productName = productName
                      

                    } else {

                        const res = await fetch(imagePath)

                        const data = await res.buffer()

                     //   const b64 = data.toString('base64');
                      //  const ext = path.extname(filePath)
                        keywordsObj[index].imageSrc = fileName
                        keywordsObj[index].title = title
                        keywordsObj[index].productName = productName
                      
                        fs.writeFileSync(filePath, data)

                    }
                }
                debugger
                const arr = Object.entries(keywordsObj).map(m => {


                    return { index: m[0], ...m[1] }
                })

                const groupByCategory = groupBy(arr, 'category')
                debugger


                imageIndexes.push({ index: navIndex, imageIndexes: groupByCategory })
            }
            fs.writeFileSync(`${process.cwd()}/api/_files/image-indexes/image-indexes.json`, JSON.stringify(imageIndexes))
        }
    }

    fs.writeFileSync(`${process.cwd()}/src/image-indexes.json`, JSON.stringify(kewordImages))
    debugger

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
})()




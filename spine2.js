
const fetch = require('node-fetch')
const fs = require('fs')
const { getSingleContent, mergePrevAndNewData } = require('./utils/uploadCollection')


//getSingleContent(`kadin/sementa.json.gz`)
//unzipSingleContent(`single-content/kadin/sementa.json.gz`)
debugger

const data = [{
    "title": "sementa kadın fermuarlı cepli triko ceket - siyah - gri _kadin",
    "priceNew": "2.199,99",
    "imageUrl": "kadin-fermuarli-cepli-triko-ceket-siyah-gri-ceket-sementa-18692-84-B.jpg",
    "link": "kadin-fermuarli-cepli-triko-ceket-siyah-gri",
    "timestamp": 1674646327660,
    "marka": "sementa"
}]
mergePrevAndNewData({ gender: 'kadin', marka: 'sementa', data })

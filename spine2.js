

(async ()=>{
    const fetch = require('node-fetch')
const fs = require('fs')
const { getSingleContent, unzipSingleContent } = require('./utils/uploadCollection')

   await getSingleContent(`kadin/sementa.json.gz`)
  await  unzipSingleContent(`single-content/kadin/penti.json.gz`) 
})

debugger





// (async ()=>{
//   const fs = require('fs')
// const fetch = require('node-fetch')

//   const response = await fetch(`https://github.com/codergihub/fasion/tree/kadin/public/image-indexes`, { method: 'get' })
//   debugger
//   const data = await response.json()

//   debugger
// })()




(() => {
  const { walkSync } = require('./utils/walkSync')
  var AdmZip = require("adm-zip");
  const fs = require("fs");
  var zip = new AdmZip();
  const path = require('path')

  walkSync('public/image-indexes', (filepath) => {
 
    const fileName = path.basename(filepath)

    zip.addLocalFile(filepath);
  })
  zip.writeZip("test.zip");

})

async function extractArchive(filepath) {
  try {
    var AdmZip = require("adm-zip");
    const path =require('path')
    const zip = new AdmZip(filepath);
    const outputDir = `${path.parse(filepath).name}_extracted`;
    zip.extractAllTo(outputDir);

    console.log(`Extracted to "${outputDir}" successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

extractArchive("./test.zip");
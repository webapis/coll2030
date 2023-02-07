

// // (async () => {
// //   const fs = require('fs')
// //   const fetch = require('node-fetch')
// //   debugger
// //   const response = await fetch(`https://github.com/webapis/coll2030/blob/master/store.tar.gz?raw=true`, { method: 'get' })
// //   var file = fs.createWriteStream('store2.tar.gz');
// //   debugger
// //   response.body.pipe(file)

// //   debugger
// // })



//   (() => {
//     const { walkSync } = require('./utils/walkSync')
//     var AdmZip = require("adm-zip");
//     const fs = require("fs");
//     var zip = new AdmZip();
//     const path = require('path')

//     walkSync('public/image-indexes', (filepath) => {

//       const fileName = path.basename(filepath)

//       zip.addLocalFile(filepath);
//     })
//     zip.writeZip("test.zip");

//   })

// async function extractArchive(filepath) {
//   try {
//     var AdmZip = require("adm-zip");
//     const path = require('path')
//     const zip = new AdmZip(filepath);
//     const outputDir = `${path.parse(filepath).name}_extracted`;
//     zip.extractAllTo(outputDir);

//     console.log(`Extracted to "${outputDir}" successfully`);
//   } catch (e) {
//     console.log(`Something went wrong. ${e}`);
//   }
// }


(() => {
  var targz = require('tar.gz');
  var compress = new targz().compress('public/image-indexes', 'store.tar.gz',
    function (err) {
      if (err)
        console.log(err);
      console.log('The compression has ended!');
    });
})


(()=>{

  const decompress = require('decompress');
  const decompressTargz = require('decompress-targz');
   
  decompress('store2.tar.gz', 'dist2', {
      plugins: [
          decompressTargz()
      ]
  }).then(() => {
      console.log('Files decompressed');
  });

}

)

()
//extractArchive("./test.zip");


const fs = require('fs')

var AdmZip = require("adm-zip");
const {compress}=require('compressed-json')
const path =require('path')

const { walkSync } = require('./utils/walkSync')
//const zip = new AdmZip(`${process.cwd()}/output.zip`);
// Convert json object
let markaProducts = []
walkSync(path.join(process.cwd(), `data/biraradamoda/kadin/beymen`), async (filepath) => {
    const data = JSON.parse(fs.readFileSync(filepath))
    markaProducts.push(data)
})
// debugger
var content = compress( markaProducts);
// zip.addFile('comp.json',Buffer.from(JSON.stringify(content)))
debugger
//fs.writeFileSync('output.json',JSON.stringify(content));
// //  zip.writeZip(`${process.cwd()}/compresses.zip`,JSON.stringify(content));

 debugger



function compressesFile(content, zipName,output){
 const zip = new AdmZip();
 zip.addFile(zipName,Buffer.from(JSON.stringify(content)))
// zip.writeZip(output);
 fs.writeFileSync(output, zip.toBuffer());
}

function decompressFile(filepath,zipName){

    const zip = new AdmZip(filepath);
    zip.extractEntryTo(zipName,'./');
}

decompressFile('downloaded.zip','beymen.json')
//ompressesFile(content,'beymen.json','./beymen.zip')
// decompressFile('./beymen.zip','beymen.json')
// var zlib = require('zlib');


// var gzip = zlib.createGzip();
// var r = fs.createReadStream('output.json');
// var w = fs.createWriteStream('output.json.gz');
// r.pipe(gzip).pipe(w);


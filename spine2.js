
(async()=>{
    const sharp = require('sharp');
    const fs =require('fs')
    const buffer =fs.readFileSync('./public/category-sprite/sprite.jpg')
    await sharp(buffer)
    .jpeg()
    .toFile('./public/category-sprite/sprite-compressed.jpg');

})()
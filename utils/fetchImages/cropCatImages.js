

    (async () => {
        const im = require('imagemagick');
        const { walkSync } = require('../walkSync')
        const fs =require('fs')
        const path = require('path')
        const plimit = require('p-limit')
        const limit = plimit(5);
        const files = []
        const promises = []
        walkSync('sprites', (src) => {
            const fileName = path.basename(src)
            const srcPath= path.join(process.cwd(),src)
            debugger
            const dstPath = path.join(process.cwd(), 'sprites-cropped', fileName)
            promises.push(limit(async () => await cropImage({ srcPath, dstPath })))
        })
        async function cropImage({ srcPath, dstPath }) {
        
            return new Promise((resolve, reject) => {
                im.crop({
                    srcPath,
                    dstPath,
                    height: 200,
                    quality:0.7
                }, function (err, stdout, stderr) {
                    debugger
                    if (err)
                        reject(err)
                    console.log('resized kittens.jpg to fit within 200');
                    resolve(true)
        
                });
            })
        }
        await Promise.all(promises)


    })()



    

    (async () => {
        const im = require('imagemagick');
        const { walkSync } = require('../walkSync')
        const path = require('path')
        const plimit = require('p-limit')
        const makeDir =require('make-dir')
        const limit = plimit(5);
        const files = []
        const promises = []
        walkSync('sprites', (src) => {
            const fileName = path.basename(src)
            const groupName =src.split('\\')[1]
            const srcPath= path.join(process.cwd(),src)
      
            const dstPath = path.join(process.cwd(), 'sprites-cropped',groupName, fileName)
            promises.push(limit(async () => await cropImage({ srcPath, dstPath })))
        })
        async function cropImage({ srcPath, dstPath }) {
            await makeDir(path.dirname(dstPath))
            return new Promise((resolve, reject) => {
                im.crop({
                    srcPath,
                    dstPath,
                    height: 200,
                 
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


    



    // (async () => {
    //     const sharp = require('sharp');
    //     const im = require('imagemagick');
    //     const { walkSync } = require('../walkSync')
    //     const fs =require('fs')
    //     const path = require('path')
    //     const plimit = require('p-limit')
    //     const limit = plimit(5);
    //     const files = []
    //     const promises = []
    //     walkSync('sprites', (src) => {
    //         const fileName = path.basename(src)
    //         const groupName =src.split('\\')[1]
    //         debugger
    //         const srcPath= path.join(process.cwd(),src)
    //         debugger
    //         const dstPath = path.join(process.cwd(), 'sprites-cropped',groupName, fileName)
    //         promises.push(limit(async () => await cropImage({ srcPath, dstPath })))
    //     })
    //     async function cropImage({ srcPath, dstPath }) {
        
         
    //             const fs =require('fs')
    //             const buffer =fs.readFileSync(srcPath)
    //             await sharp(buffer)
    //             .resize(null,200)
    //             .webp()
    //             .toFile(dstPath.replace('.jpg','.webp'));
          
    //     }
    //     await Promise.all(promises)


    // })()

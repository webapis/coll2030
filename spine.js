

var nsg = require('node-sprite-generator');
const { readdirSync } = require('fs')

const makeDir = require('make-dir')
const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
const dirnames = getDirectories('sprites')
debugger
for (let groupName of dirnames) {

     generateSprite({ groupName })

}

async function generateSprite({ groupName }) {
    debugger
    return new Promise(async (resolve, reject) => {
        await makeDir(`public/category-sprite/${groupName}`)
        nsg({
            src: [`sprites-cropped/${groupName}/*.jpg`],
            spritePath: `public/category-sprite/${groupName}/sprite.jpg`,
            stylesheet: 'css',
            layout: 'packed',
            stylesheetPath: `public/category-sprite/${groupName}/sprite.css`,
            compositor: 'jimp'
        }, function (err) {
            console.log('Sprite generated!');
            if (err)
                reject(err)
                resolve(true)
        });
    })
}


//


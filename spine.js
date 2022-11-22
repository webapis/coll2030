
const { walkSync } = require('./utils/walkSync')
var nsg = require('node-sprite-generator');
const { readdirSync } = require('fs')
const path = require('path')
const files = []
walkSync('sprites', (file) => {
    files.push(file)
})
const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
const dirnames = getDirectories('sprites')
debugger


    debugger

    nsg({
        src: [`sprites-cropped/*.jpg`],
        spritePath: `public/category-sprite/sprite.jpg`,
        stylesheet: 'css',
        layout: 'packed',
        stylesheetPath: `public/category-sprite/sprite.css`,
        compositor: 'jimp'
    }, function (err) {
        console.log('Sprite generated!');
    });
    debugger




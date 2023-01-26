require('dotenv').config()
const fs = require('fs')
var zlib = require('zlib');
const fetch = require('node-fetch')
const makeDir = require('make-dir')
const path = require('path')
const { walkSync } = require('./walkSync')
async function uploadCollection({ fileName, data, gender }) {

    await compressFile({ fileName, data, gender })

    let buff = fs.readFileSync(`${fileName}.json.gz`);
    let base64data = buff.toString('base64');

    const response = await fetch(`https://api.github.com/repos/webapis/keyword-editor/contents/${gender}/${fileName}.json.gz`, { method: 'put', headers: { Accept: "application/vnd.github.v3+json", authorization: `token ${process.env.GH_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" }, body: JSON.stringify({ message: 'coder content', content: base64data, branch: 'main' }) })

    console.log('upload response', response)
}

async function compressFile({ fileName, data }) {
    fs.writeFileSync(`${fileName}.json`, JSON.stringify(data))

    return new Promise((resolve, reject) => {
        var gzip = zlib.createGzip();
        var r = fs.createReadStream(`${fileName}.json`);
        var w = fs.createWriteStream(`${fileName}.json.gz`);
        w.on('close', () => {
            resolve(true)
        })
        w.on('error', (error) => {
            reject(error)
        })
        r.pipe(gzip).pipe(w);
    })

}

async function downloadCollection() {

    const gender = process.env.GENDER
    console.log('gender', gender)
    
    await getZipFiles(gender)

    await unzipFiles(gender)
}


async function unzipFiles(gender) {

    const promises = []
    try {
        walkSync(path.join(process.cwd(), `/${gender}`), async (filepath) => {
            debugger
            promises.push(filepath)

        })
        console.log('uzip file length', promises.length)
        for (let a of promises) {
            debugger
            await unzipSingleFile(a, gender)
        }

    } catch (error) {
        debugger
    }


}

async function unzipSingleFile(zippedfilePath, gender) {
    debugger
    const unzippedFilePath = zippedfilePath.replace(gender, 'unzipped-data').replace('.gz', '')
    const folderPath = path.dirname(unzippedFilePath)
    await makeDir(folderPath)

    const fileContents = fs.createReadStream(zippedfilePath);
    const writeStream = fs.createWriteStream(unzippedFilePath);
    const unzip = zlib.createGunzip();
    debugger
    return new Promise((resolve, reject) => {
        writeStream.on('close', () => {
            console.log('unzip complete')
            resolve(true)
        })
        writeStream.on('error', (error) => {
            console.log('unzip error', error)
            reject(error)
        })
        fileContents.pipe(unzip).pipe(writeStream);
    })

}

async function getZipFiles(gender) {
    // Retrieve source code for project
    //Retrieved source code will be copied to project branch of forked agregators repo
    //---- List branches endpoint----
    /*required for the next endoint*/
    const response = await fetch(`https://api.github.com/repos/webapis/keyword-editor/branches`, { method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token ${process.env.GH_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" } })
    const data = await response.json()
    const mainSha = data.find(d => d.name === 'main')
    const { commit: { sha } } = mainSha

    //------Git database / Get a tree endpoint------
    /*required to retrieve list of file and folder into*/
    const treeResponse = await fetch(`https://api.github.com/repos/webapis/keyword-editor/git/trees/${sha}?recursive=1`, { method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token ${process.env.GH_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" } })
    const treeData = await treeResponse.json()
    const { tree } = treeData
        ;
    const dataFolderTrees = tree.filter(f => f.type === 'blob' && f.path.includes(`${gender}/`))
    debugger

    for (let t of dataFolderTrees) {
        await getContent(t.path)
    }
}

async function getContent(filepath) {
    const folderPath = path.dirname(filepath)
    debugger
    await makeDir(folderPath)
    const response = await fetch(`https://api.github.com/repos/webapis/keyword-editor/contents/${filepath}`, { method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token ${process.env.GH_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" } })

    var file = fs.createWriteStream(filepath);

    //     const data = await response.json()

    //     const content = data.content
    // 
    //     let buff = new Buffer(content, 'base64');

    //     let text = buff.toString('utf-8');

    return new Promise((resolve, reject) => {
        response.body.on('close', () => {
            console.log('fetched')
            resolve()

        })
        response.body.on('error', (error) => {
            reject(error)

        })

        response.body.pipe(file)
    })

}

module.exports = { uploadCollection, downloadCollection }
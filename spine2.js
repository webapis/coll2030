
const fetch = require('node-fetch')
const fs = require('fs')
const {downloadCollection} =require('./utils/uploadCollection')
async function pushContentToProjectBranch() {

    let buff = fs.readFileSync('output.json');
    let base64data = buff.toString('base64');

    const response = await fetch(`https://api.github.com/repos/webapis/keyword-editor/contents/output.json`, { method: 'put', headers: { Accept: "application/vnd.github.v3+json", authorization: `token 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`, "X-GitHub-Api-Version": "2022-11-28" }, body: JSON.stringify({ message: 'coder content', content: base64data, branch: 'main' }) })
    const data = await response.text()
    console.log('response', response)


}

//pushContentToProjectBranch()


async function fetchFile() {

    const response = await fetch('https://api.github.com/repos/webapis/keyword-editor/contents/beymen.zip', { method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token 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`, "X-GitHub-Api-Version": "2022-11-28" } })
    debugger
    var file = fs.createWriteStream("downloaded2.zip");

    //     const data = await response.json()

    //     const content = data.content
    // debugger
    //     let buff = new Buffer(content, 'base64');

    //     let text = buff.toString('utf-8');
    response.body.on('close',()=>{
        console.log('closed')
    })
    response.body.pipe(file)

}

//fetchFile()


async function getPluginsSourceCodeTree() {
    // Retrieve source code for project
    //Retrieved source code will be copied to project branch of forked agregators repo
    //---- List branches endpoint----
    /*required for the next endoint*/
    const response = await fetch(`https://api.github.com/repos/webapis/keyword-editor/branches`,{ method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token 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`, "X-GitHub-Api-Version": "2022-11-28" }})
    const data = await response.json()
    const mainSha = data.find(d => d.name === 'main')
    const { commit: { sha } } = mainSha
debugger
    //------Git database / Get a tree endpoint------
    /*required to retrieve list of file and folder into*/
    const treeResponse = await fetch(`https://api.github.com/repos/webapis/keyword-editor/git/trees/${sha}?recursive=1`,{ method: 'get', headers: { Accept: "application/vnd.github.raw", authorization: `token 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`, "X-GitHub-Api-Version": "2022-11-28" }})
    const treeData = await treeResponse.json()
    const { tree } = treeData
    debugger;
    const dataFolderTrees =tree.filter(f=>f.type==='blob' && f.path.includes('data/'))
    debugger
    return dataFolderTrees
}

//getPluginsSourceCodeTree()
downloadCollection('kadin')
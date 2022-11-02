
(async () => {


    require('dotenv').config()
    console.log('--------------------------------------------------------------')

    const path = require('path')
    const makeDir = require('make-dir');
    const { walkSync } = require('./walkSync')
    const { productTitleMatch } = require('../netlify/functions/productTitleMatch')
    const fs = require('graceful-fs')
    console.log('--------------------------------------------------------------')


    const website = process.env.WEBSITE

    const keywords = require(path.join(process.cwd(), `api/_files/nav/keywords.json`))
    fs.rmSync(path.join(process.cwd(), `api/_files/data`), { recursive: true, force: true });
    const getDirectories = source =>
        fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)

    const dirnames = getDirectories(path.join(process.cwd(), `data/${website}`))
    const promises = []
    for (let dirName of dirnames) {

        console.log('dirname merge started', dirName)
        let obj = {}
        walkSync(path.join(process.cwd(), `data/${website}/${dirName}`), async (filepath) => {

            //console.log(filepath)

            const dirName = path.dirname(filepath)
            const data = JSON.parse(fs.readFileSync(filepath))

            if (obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] === undefined) {
                obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] = [data]
            }
            else {
                obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")] = [...obj[dirName.replace(/[\\]/g, "-").replace(/[/]/g, "-")], data]
            }

        })
        const categoryKeywords = keywords.filter(f => f.keywordType === 'category')

        for (let o in obj) {
            // console.log(o)
            const s = o.split('-').reverse()

            const marka = s[0]
            const data = obj[o]

            for (let d of data) {
                const { title } = d

                var machfound = false
                for (let k of categoryKeywords) {


                    const nws = k.exclude !== '' ? k.exclude.split(',') : []
                    const match = productTitleMatch({ kw: k.keywords, nws, title })
                    if (match) {
                        await saveToFunctionName({ k, marka, d })

                        // const savePath = path.join(process.cwd(), `api/_files/data/${k.functionName}/${marka}.json`)
                        // console.log('savePath', savePath)
                        // if (fs.existsSync(savePath)) {

                        //     const data = fs.readFileSync(savePath, { encoding: 'utf8' })
                        //     const dataObj = JSON.parse(data)
                        //     const previouslyAdded = dataObj.find(f => f.link === d.link)
                        //     if (!previouslyAdded) {
                        //         fs.writeFileSync(savePath, JSON.stringify([...dataObj, d]))
                        //     }


                        // }
                        // else {

                        //     makeDir.sync(path.dirname(savePath))
                        //     fs.writeFileSync(savePath, JSON.stringify([d]))

                        // }

                        machfound = true
                        //  break;
                    }


                }


                if (machfound === false) {

                    // const savePath = path.join(process.cwd(), `api/_files/data/diger/${marka}.json`)
                    // if (fs.existsSync(savePath)) {

                    //     const data = fs.readFileSync(savePath, { encoding: 'utf8' })
                    //     const dataObj = JSON.parse(data)

                    //     fs.writeFileSync(savePath, JSON.stringify([...dataObj, d]))

                    // }
                    // else {

                    //     makeDir.sync(path.dirname(savePath))
                    //     fs.writeFileSync(savePath, JSON.stringify([d]))

                    // }
                    await saveToOther({ marka, d })


                }


            }


            Promise.all(promises).then((m) => {
                console.log('done')
            })

        }
        console.log('dirname merged', dirName)



    }
    debugger

    async function saveToOther({ marka, d }) {
        const savePath = path.join(process.cwd(), `api/_files/data/diger/${marka}.json`)
        const exists = await existsAsync(savePath)
        if (exists) {
            const data = await fs.promises.readFile(savePath, { encoding: 'utf8' })
            const dataObj = JSON.parse(data)

            await fs.promises.writeFile(savePath, JSON.stringify([...dataObj, d]))
        } else {
            await makeDir(path.dirname(savePath))
            await fs.promises.writeFile(savePath, JSON.stringify([d]))
        }
    }



    async function saveToFunctionName({ k, marka, d }) {


        const savePath = path.join(process.cwd(), `api/_files/data/${k.functionName}/${marka}.json`)


        const exists = await existsAsync(savePath)
        debugger

        if (exists) {
            const data = await fs.promises.readFile(savePath, { encoding: 'utf8' })
            const dataObj = JSON.parse(data)

            await fs.promises.writeFile(savePath, JSON.stringify([...dataObj, d]))
        } else {
            await makeDir(path.dirname(savePath))
            await fs.promises.writeFile(savePath, JSON.stringify([d]))
        }


    }



    function existsAsync(path) {

        return new Promise(function (resolve, reject) {
            fs.exists(path, function (exists) {
                resolve(exists);

            })
        })
    }

})()
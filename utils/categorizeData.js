



const { getGoogleToken } = require('../google/google.oauth')
const fs = require('fs')
const { getSheetValues, appendSheetValues } = require('../google.sheet.js')
const makeDir = require('make-dir');
const path =require('path')
var through = require("through2");
var jsonArrayStreams = require("json-array-streams");


async function categorizeData() {
    const google_access_token = await getGoogleToken()
    const sheetData = await getSheetValues({ access_token: google_access_token, spreadsheetId: '1TVFTCbMIlLXFxeXICx2VuK0XtlNLpmiJxn6fJfRclRw', range: 'categoriestest!A:C' })
    let categoryItems = []
    for (let value of sheetData.values.filter((c, i) => i > 0)) {
        const subcategory = value[0]
        const category = value[1]
        const regex = value[2]

        categoryItems.push({ subcategory, category, regex })
    }

    debugger;
    return new Promise(async (resolve, reject) => {
        if (fs.existsSync('api/_files/kadin/data.json')) {
            fs.unlinkSync('api/_files/kadin/data.json')
        }
        const dirname = path.dirname('api/_files/kadin/data.json')
        debugger;
        await makeDir(dirname)
        fs.appendFileSync('api/_files/kadin/data.json', '')
        let counter = 0
        const writeStream = fs.createWriteStream('./api/_files/kadin/data.json')
        writeStream.write('[')
        const readstream = fs.createReadStream("./data-unique/data.json")
        const data = fs.readFileSync("./data-unique/data.json")
        const totalObjects = JSON.parse(data).length
        let objCounter = 0

        readstream.pipe(jsonArrayStreams.parse())
            .pipe(through.obj(async function (object, enc, cb) {
                const { title
                } = object
                const match = categoryItems.find(c => {
                    const regex = new RegExp(c.regex, 'i')
                    const result = regex.test(title.toLowerCase())

                    return result === true
                })

                let categoryExistsintitle = match && new RegExp(match.category, 'i').test(title)

                let category = match ? categoryExistsintitle ? '' : "_ " + match.category : "belirsiz"
               // console.log('match', category)
                const categorizedObject = { ...object, title: title + category }
                writeStream.write(JSON.stringify(categorizedObject))
                ++objCounter
                // console.log('objCounter', objCounter)
                // console.log('totalObjects', totalObjects)
                if (objCounter === totalObjects) {

                    writeStream.write(']')
                } else {
                    writeStream.write(',')
                }
                cb();
                debugger;
            }))

        readstream.on('data', (data) => {

            debugger;
        })
        readstream.on('close', (data) => {
            console.log('closed')

            return resolve(true)

        })

        readstream.on('error', (error) => {

            return reject(error)
        })
    })
}


(async () => {

    console.log('------------------------DATA CATEGORIZATION STARTED----------------------------------')
    await categorizeData()
    console.log('------------------------DATA CATEGORIZATION ENDED----------------------------------')
    process.exit(0)
})()
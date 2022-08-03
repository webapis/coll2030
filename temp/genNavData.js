const { workerPromise } = require('./workerPromise')
const { walkSync } = require('./walkSync')
const data = require(`${process.cwd()}/api/_files/kadin/data.json`)



debugger
const makeDir = require('make-dir');
makeDir.sync(`public/nav-data/elbise`)

walkSync(`${process.cwd()}/public/nav-keywords`, async function (fileName, state) {

    await workerPromise({ fileName })
})
debugger


(async () => {

    const fs = require('fs')
    const path = require('path')
    const plimit = require('p-limit')
    const makeDir = require('make-dir')
    const { workerPromise } = require('./workerPromiseNavGen')
    const limit = plimit(5);
    try {
        fs.rmSync(path.join(process.cwd(), `public/image-indexes`), { recursive: true, force: true });
        const fnNames = ['one', 'two', 'three','four', 'five', 'six', 'seven','eight', 'nine','ten', 'diger']
       //   const fnNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'diger']
      // const fnNames = ['seven']
        const result = await Promise.all(fnNames.map((functionName) => {

            console.log('functionName', functionName)
            if (fs.existsSync(path.join(process.cwd(), `api/_files/data/${functionName}`))) {
                return limit(async () =>await workerPromise({ functionName }))
            }
            else return null

        }))

        const catCounter = result.filter(f =>f!== null).reduce((prev, curr, i) => {
            const nxt = JSON.parse(curr).catCounter

            return { ...prev, ...nxt }
        }, {})

        debugger
        debugger
        const categoryNav = require(path.join(process.cwd(), `src/category-nav.json`))
        for (let c in catCounter) {
            debugger
            const current = catCounter[c]
            for (let v in current) {
                const { count } = current[v]

                const curNav = categoryNav[c].map(m => {

                    if (m.title === v) {
                        return { ...m, count: m.count ? m.count + count : count }
                    } else {
                        return m
                    }

                })
                categoryNav[c] = curNav

            }

        }
        debugger
        if (fs.existsSync(path.join(process.cwd(), `src/category-nav-counter.json`))) {
            fs.unlinkSync(path.join(process.cwd(), `src/category-nav-counter.json`))
        }

        fs.appendFileSync(path.join(process.cwd(), `src/category-nav-counter.json`), JSON.stringify(categoryNav));

        const catImages = result.filter(f=> f!== null).reduce((prev, curr, i) => {
            const nxt = JSON.parse(curr).catImages
            const upd = {}
            for (let c in nxt) {
                const exist = prev[c]
                if (upd[c] === undefined) {
                    upd[c] = {}
                }
                if (exist) {
                    upd[c] = { ...exist, ...nxt[c] }
                } else {
                    upd[c] = { ...nxt[c] }
                }

            }
            debugger
            return { ...prev, ...upd }
        }, {})
        debugger

        for (let cimage in catImages) {
      
            try {

                const imageIndexPath = path.join(process.cwd(), `public/image-indexes`, `${cimage}.json`)
                makeDir.sync(path.join(process.cwd(), `public/image-indexes`))
                if (fs.existsSync(imageIndexPath)) {

                    fs.unlinkSync(imageIndexPath)
                }
                fs.appendFileSync(imageIndexPath, JSON.stringify({ ...catImages[cimage] }));

            } catch (error) {
                console.log('image-indexes', error)
                throw error
            }

        }

        console.log('all workers complete')
        process.exit(0)

    } catch (error) {
        console.log('error.', error)
    }

})()
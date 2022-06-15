



(async () => {
    console.log('Generated nav')
    const makeDir = require('make-dir');
    const { dataAggregation } = require('./utils/dataAggregation')
    const { generateCategoryNav } = require('./utils/navByCategory')
    const { generateMarkaNav } = require('./utils/navByMarka')

    await makeDir('api/_files/kadin');
    await dataAggregation()
    await generateMarkaNav()
    await generateCategoryNav()
    process.exit(0)
})()
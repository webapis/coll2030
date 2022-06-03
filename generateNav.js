



(async () => {
    console.log('Generated nav')
    const { dataAggregation } = require('./utils/dataAggregation')
    const { generateCategoryNav } = require('./utils/navByCategory')
    const { generateMarkaNav } = require('./utils/navByMarka')

    await dataAggregation()
    await generateMarkaNav()
    await generateCategoryNav()
    process.exit(0)
})()
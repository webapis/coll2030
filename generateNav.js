



(async () => {

    const { generateCategoryNav } = require('./utils/navByCategory')
    const { generateMarkaNav } = require('./utils/navByMarka')
    await generateMarkaNav()
    await generateCategoryNav()
})()
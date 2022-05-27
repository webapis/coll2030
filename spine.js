const {generateCategoryNav}=require('./utils/navByCategory')
const {generateMarkaNav}=require('./utils/navByMarka')
const {mergeNewData}=require('./mongodbimport')

mergeNewData()
const { countTotal, countByBrand, countByBrandDeleted, countBySubcategory,countBySubcategoryDeleted,countTotalCollected,countTotalCollectedByBrand,countTotalCollectedBySubcategory } = require('./util')

function countTotalUpdated() {
  countTotal('updated-data', `projects/trends/src/reports/updated/total-updated.json`)
  countTotal('old-data', `projects/trends/src/reports/updated/total-deleted.json`)
  countTotal('collected-data', `projects/trends/src/reports/updated/total-newdata.json`)
  countTotalCollected('projects/dream/data',`projects/trends/src/reports/updated/total-collected.json`)
}

function countByBrandUpdated() {
  countByBrand('updated-data', `projects/trends/src/reports/updated/by-brand-updated.json`)
  countByBrand('collected-data', `projects/trends/src/reports/updated/by-brand-newdata.json`)
  countByBrandDeleted('old-data', `projects/trends/src/reports/updated/by-brand-deleted.json`)
  countTotalCollectedByBrand('projects/dream/data',`projects/trends/src/reports/updated/total-collected-by-brand.json`)
}

function countBySubcategoryUpdated() {
  debugger
  countBySubcategory('updated-data', `projects/trends/src/reports/updated/by-subcategory-updated.json`)
  countBySubcategory('collected-data', `projects/trends/src/reports/updated/by-subcategory-newdata.json`)
  countBySubcategoryDeleted('old-data',`projects/trends/src/reports/updated/by-subcategory-deleted.json`)
  countTotalCollectedBySubcategory('projects/dream/data',`projects/trends/src/reports/updated/total-collected-by-subcategory.json`)
}

function generateUpdatedReport() {
    countTotalUpdated()
    countByBrandUpdated()
    countBySubcategoryUpdated()

}


module.exports = { generateUpdatedReport }
const fs =require('fs')
function navTree(data) {

    const groupByCategory = data.sort((a, b) => (a.category > b.category) ? 1 : -1).reduce((group, product) => {
        const {  category } = product;
        group[category] = group[category] ?? [];
        group[category].push(product);
        return group;
    }, {});


    const groupbysub = {}

    for (let c in groupByCategory) {
        const current = groupByCategory[c]
        groupbysub[c] = {
            total: current.length, subcategories: current.reduce((group, product) => {
                const { subcategory } = product;

                group[subcategory] = group[subcategory] ?? [];
                group[subcategory].push(product);
                return group;
            }, {})
        }

    }

    const groupbysubcount = {}
    debugger;    for (let c in groupbysub) {
        const { total, subcategories } = groupbysub[c]
        const subs = {}

        for (let s in subcategories) {
            const current = subcategories[s]
            subs[s] = { subcategory: s, subCatTotal: current.length }

        }

        groupbysubcount[c] = {
            categoryTotal: total,
            category: c,
            subcategories: subs
        }

    }
    fs.unlinkSync(`src/nav.json`)
debugger;
    fs.appendFileSync(`src/nav.json`, JSON.stringify(groupbysubcount))
return groupbysubcount
}
module.exports = {navTree}

const data = require('./api/_files/kadin/data.json')
const fs =require('fs')
debugger;
function order(items) {
    const groupByMarka = items.sort((a, b) => (a.subcategory > b.subcategory) ? 1 : -1).reduce((group, product) => {
        const { marka } = product;
        group[marka] = group[marka] ?? [];
        group[marka].push(product);
        return group;
    }, {});

    const groupbysub = {}

    for (let c in groupByMarka) {
        const current = groupByMarka[c]

        groupbysub[c] = {
            total: current.length, subcategories: current.reduce((group, product) => {
                const { subcategory } = product;

                group[subcategory] = group[subcategory] ?? [];
                group[subcategory].push(product);
                return group;
            }, {})
        }



    }
debugger;
    const addItemOrder = {}
    for (let c in groupbysub) {
        const { subcategories } = groupbysub[c]
        addItemOrder[c] = {}
        for (let s in subcategories) {

            addItemOrder[c][s] = []

            const current = subcategories[s].map((sk, i) => { return { ...sk, itemOrder: i } })

            addItemOrder[c][s] = current


        }


    }

    let flatten = []

    for (let c in addItemOrder) {

        const current = addItemOrder[c]

        for (let s in current) {



            const currents = current[s]

            flatten.push(...currents)


        }


    }


debugger;

    return flatten.sort((a, b) => (a.itemOrder > b.itemOrder) ? 1 : -1)
}
debugger;
const result =order(data)

fs.unlinkSync(`./api/_files/kadin/data.json`)
fs.appendFileSync(`./api/_files/kadin/data.json`, JSON.stringify(result))

debugger;
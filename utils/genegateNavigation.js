


(async () => {
  console.log('--------------GEN NAV DATA STARTED-------------')


  await genNav({ node: 'dream', subcategory: 'elbise' })

  process.exit(0)

})()

//

async function genNav({ node, subcategory }) {
  console.log('node', node)
  console.log('subcategory', subcategory)
  const path = require('path')
  const makeDir = require('make-dir');
  //await makeDir(`../api/_files/key/${subcategory}`)
  const fs = require('fs')
  const folder = path.join(process.cwd(), `api/_files/data/${subcategory}`)
  console.log('folder', folder)
  const folder1 = path.join(process.cwd(), `api/_files/data/${subcategory}`)
  const folderexists = fs.existsSync(folder1)
  const filess = fs.readdirSync(folder1)
  filess.forEach(file => {
    console.log('file', file)
  })
  console.log('folderexists', folderexists)
  const files = fs.readdirSync(folder)


  console.log('files.length', files.length)

  const dataCollection = []
  for (let file of files) {

    const data = fs.readFileSync(`${folder}/${file}`, { encoding: 'utf8' })

    const dataObjectArr = JSON.parse(data)
    dataCollection.push(...dataObjectArr)
  }

  const { productTitleMatch } = require('./productTitleMatch')


  const categoryNav = { count: dataCollection.length, node, subcategory }
  // const categoryNavArray = fs.readFileSync(`${process.cwd()}/src/category-nav.json`, { encoding: 'utf-8' })
  // const categoryAsArrayObject = JSON.parse(categoryNavArray).filter(f => f.subcategory !== subcategory)
  // categoryAsArrayObject.push(categoryNav)


  // fs.writeFileSync(`${process.cwd()}/src/category-nav.json`, JSON.stringify(categoryAsArrayObject))
  debugger
  const allkeywords = require(path.join(process.cwd(), `api/_files/nav/${subcategory}/keywords.json`))
  let navKeys = { ['0-']: { navMatch: [], keywords: {} } }

  let objCounter = 0
  dataCollection.forEach(async (object) => {

    // console.log('objCounter', ++objCounter)
    const { subcategory, title, imageUrl, marka, priceNew, node } = object


    let navMatchCollection = []
    if (title) {

      const keywords = allkeywords[subcategory]
      if (keywords && keywords.length > 0) {

        const navMatch = keywords.map((m, b) => { return { ...m, index: m.index.toString() + '-' } }).filter((kws) => {


          let exactmatch = kws.exactmatch
          let negwords = kws.negwords

          let index = parseInt(kws.index.replace(/-/g,''))
          debugger
          if (index <=12) {
            const priceRange = kws.keyword.split('-').map(m => parseInt(m).toFixed(2))
            const startPrice = parseFloat(priceRange[0])
            const endPrice = parseFloat(priceRange[1])

            try {
              const price = priceNew.toString().replace('.', '').replace(',', '.')
              const productPrice = parseFloat(price)



              if (endPrice) {

                if (productPrice >= startPrice && productPrice <= endPrice) {
                  return true
                } else {
                  return false;
                }

              }
              else {

                if (productPrice >= startPrice) {
                  return true
                } else {

                  return false
                }

              }
            } catch (error) {
              debugger
            }

          } else {

            let nws = []
            if (negwords) {
              nws = negwords.split(',')

            }
            const kw = kws.keyword
            const match = productTitleMatch({ kw, title, exactmatch, nws })
            return match
          }

        })

        if (navMatch.length > 0) {

          navMatchCollection.push(navMatch)

          const possibleCombination = getCombinations(navMatch.map((m) => m.index))

          possibleCombination.forEach(async (c, h) => {

            const comb = c.split('-').filter(f => f !== '').map(m => parseInt(m)).sort((a, b) => a - b).map(m => m + "-").join('')
            const mapComb = comb.split('-').filter(f => f !== '').map((m) => {
              const obj = navMatch.find(f => f.index.replace('-', '').trim() === m)
              return obj
            })

            let doubleExist = false
            for (let g of mapComb) {

              let match = navMatch.filter(f => f.groupid === g.groupid)

              if (match.length > 1) {
                doubleExist = true

              }

            }

            if (true) {


              if (navKeys[comb] === undefined) {
                navKeys[comb] = { keywords: {} }
              }
              navMatch.forEach(nm => {
                const { keyword, group, index, parentkey } = nm

                if (navKeys[comb].keywords[keyword] === undefined) {

                  navKeys[comb].keywords[keyword] = { count: 1, group: group.trim(), index, imageUrl, marka, parentkey }
                }
                else {
                  const count = navKeys[comb].keywords[keyword].count
                  navKeys[comb].keywords[keyword] = { count: count + 1, group: group.trim(), index, imageUrl, marka, parentkey }
                }

              })

            }
          })
          navMatch.forEach(nm => {
            const { keyword, group, index, parentkey } = nm

            if (navKeys['0-'].keywords[keyword] === undefined) {

              navKeys['0-'].keywords[keyword] = { count: 1, group: group.trim(), index, imageUrl, marka, parentkey }
            }
            else {
              const count = navKeys['0-'].keywords[keyword].count
              navKeys['0-'].keywords[keyword] = { count: count + 1, group: group.trim(), index, imageUrl, marka, parentkey }
            }

          })


        }


      }

    }
  })//end




  console.log('nav gen complete')

  let regrouped = []

  for (let nk in navKeys) {

    const { keywords } = navKeys[nk]

    const map = Object.entries(keywords).map((m) => { return { ...m[1], keyword: m[0] } })

    const navKeywords = map.reduce((prev, curr) => {

      if (prev[curr.group] === undefined) {
        return { ...prev, [curr.group]: { keywords: [{ keyword: curr.keyword, index: curr.index, count: curr.count, imageUrl: curr.imageUrl, marka: curr.marka, parentkey: curr.parentkey }] } }
      } else {


        return {
          ...prev, [curr.group]: { keywords: [...prev[curr.group].keywords, { keyword: curr.keyword, index: curr.index, count: curr.count, imageUrl: curr.imageUrl, marka: curr.marka, parentkey: curr.parentkey }] }
        }
      }

    }, {})

    const sorted = Object.entries(navKeywords).map((m, i) => {
      const groupName = m[0]

      const keywords = m[1]['keywords'].sort(function (a, b) {
        var textA = a.parentkey.toUpperCase();
        var textB = b.parentkey.toUpperCase();

        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })

      return { groupName, keywords }
    }).sort(function (a, b) {
      var textA = a.groupName.toUpperCase();
      var textB = b.groupName.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
    const id = parseInt(nk.replace(/-/g, '').trim())

    regrouped.push({ index: nk, keywords: sorted, id })


  }




  const sorted = regrouped.sort((a, b) => {


    return a.id - b.id
  })


  const mapped = sorted.map(s => {
    const { id } = s
    const fn = id % 2
    return { ...s, fn }

  })

  const firstPart = mapped.filter((f) => f.fn === 0)
  const secondPart = mapped.filter((f) => f.fn === 1)


  debugger

  // if (fs.existsSync(`projects/${node}/api/_files/key/${subcategory}/0-keywords.json`)) {
  //   fs.unlinkSync(`projects/${node}/api/_files/key/${subcategory}/0-keywords.json`)
  // }
  // if (fs.existsSync(`projects/${node}/api/_files/key/${subcategory}/1-keywords.json`)) {
  //   fs.unlinkSync(`projects/${node}/api/_files/key/${subcategory}/1-keywords.json`)
  // }


  const savePathDir = path.join(process.cwd(), `api/_files/key/${subcategory}`)
  await makeDir(savePathDir)

  const path0 = path.join(process.cwd(), `api/_files/key/${subcategory}`, '0-keywords.json')
  const path1 = path.join(process.cwd(), `api/_files/key/${subcategory}`, '1-keywords.json')
  //console.log('path0', path0)
  //console.log('path1', path1)
    if (fs.existsSync(path0)) {
    fs.unlinkSync(path0)
  }
  if (fs.existsSync(path1)) {
    fs.unlinkSync(path1)
  }
  fs.appendFileSync(path0, JSON.stringify(firstPart));
  fs.appendFileSync(path1, JSON.stringify(secondPart));




  // if (fs.existsSync(`${process.cwd()}/src/category-nav.json`)) {
  //   fs.unlinkSync(`${process.cwd()}/src/category-nav.json`)
  // }
  debugger
  //   const categoryAsArray = Object.entries(categoryNav).map(c => {
  // debugger
  //     return { subcategory: c[0], total: c[1].count }
  //   }).sort((a, b) => {

  //     var textA = a['subcategory'].toUpperCase();
  //     var textB = b['subcategory'].toUpperCase();
  //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  //   })


  //fs.appendFileSync(`${process.cwd()}/src/category-nav.json`, JSON.stringify(categoryNav));
  console.log('end....1')

}



function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}



function getCombinations(chars) {
  var result = [];
  var f = function (prefix, chars) {
    for (var i = 0; i < chars.length; i++) {
      result.push(prefix + chars[i]);
      f(prefix + chars[i], chars.slice(i + 1));
    }
  }
  f('', chars);
  return result;
}

module.exports = { getCombinations }
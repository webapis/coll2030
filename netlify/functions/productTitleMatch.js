
function productTitleMatch({ kw, title, nws }) {

    if (title) {



        const match = kw.split(',').some(function (keyword) {
            // let  regex ='(^|\\s)'+keyword+'(\\s|\\b)'.replace(' ','')
            if (nws.length > 0) {
                if (nws.filter((f) => {
                    if (f.toLowerCase() === 'şal detaylı') {
                        debugger
                    }
                    const exists = title.toLowerCase().indexOf(f.toLowerCase()) !== -1
                    if (f.toLowerCase() === 'şal detaylı') {
                        debugger
                    }
                    return exists
                }).length > 0) {

                    return false
                } else {

                    // if (exactmatch) {

                    return title.toLowerCase().split(' ').find(f => f === keyword.toLowerCase())//.replace(/\s/g, ',').split(',').filter(f => f === keyword).length > 0
                    // } else {

                    //   return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword || f.indexOf(keyword) === 0).length > 0
                    //  }
                }

            } else {
                // if (exactmatch) {
                return title.toLowerCase().split(' ').find(f => f === keyword.toLowerCase())//.replace(/\s/g, ',').split(',').filter(f => f === keyword).length > 0
                //}// else {
                //  return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword || f.indexOf(keyword) === 0).length > 0
                //  }

            }


        })

        return match
    } else {

        return false
    }
}


module.exports = {
    productTitleMatch
}
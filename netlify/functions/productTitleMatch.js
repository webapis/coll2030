
function productTitleMatch({ kw, title, exactmatch, nws }) {

    if(title){

        if(title.includes('tunic') && kw.includes('tunic')){
            debugger
        }

    const match = kw.split(',').some(function (keyword) {

        if (nws.length > 0) {
            if (nws.filter((f) => title.indexOf(f) !== -1).length > 0) {
                return false
            } else {

               // if (exactmatch) {
         
                    return title.toLowerCase().includes(keyword)//.replace(/\s/g, ',').split(',').filter(f => f === keyword).length > 0
               // } else {

                 //   return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword || f.indexOf(keyword) === 0).length > 0
              //  }
            }

        } else {
           // if (exactmatch) {
                return title.toLowerCase().includes(keyword)//.replace(/\s/g, ',').split(',').filter(f => f === keyword).length > 0
            //}// else {
              //  return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword || f.indexOf(keyword) === 0).length > 0
          //  }

        }


    })
    if(title.includes('tunic') && kw.includes('tunic')){
        debugger
    }
    return match
} else{
    
    return false
}
}


module.exports = {
    productTitleMatch
}
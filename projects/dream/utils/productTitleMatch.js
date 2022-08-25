
function productTitleMatch({ kw, title, exactmatch, nws }) {
    if(title){

    
 
    const match = kw.replace('^', '').replace(/\s/g, ',').split(',').every(function (keyword) {

        if (nws.length > 0) {
            if (nws.filter((f) => title.indexOf(f) !== -1).length > 0) {


            
                return false
            } else {

                if (exactmatch) {
         
                    return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword).length > 0
                } else {

                    return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword || f.indexOf(keyword) === 0).length > 0
                }
            }

        } else {
            if (exactmatch) {
                return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword).length > 0
            } else {
                return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword || f.indexOf(keyword) === 0).length > 0
            }

        }


    })


    return match
} else{
    
    return false
}
}


module.exports = {
    productTitleMatch
}
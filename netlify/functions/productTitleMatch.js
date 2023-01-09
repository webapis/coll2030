
function productTitleMatch({ kw, title, nws }) {
    if(kw==='bluz'){
        debugger
      }

    if (title) {



        const match = kw.split(',').some(function (keyword) {
          
       
            // let  regex ='(^|\\s)'+keyword+'(\\s|\\b)'.replace(' ','')
       
            if (nws.length > 0) {

           
                if (nws.filter((f) => {
              
                    const exists = title.toLowerCase().indexOf(f.toLowerCase()) !== -1
             
                    return exists
                }).length > 0) {

                    return false
                } else {
                    if(kw==='bluz'  && title.toLowerCase().indexOf('bluz')!=-1){
                        debugger
                      }
               
                    // if (exactmatch) {

                        return title.toLowerCase().indexOf(keyword.toLowerCase()) !==-1//.replace(/\s/g, ',').split(',').filter(f => f === keyword).length > 0
                    // } else {

                    //   return title.toLowerCase().replace(/\s/g, ',').split(',').filter(f => f === keyword || f.indexOf(keyword) === 0).length > 0
                    //  }
                }

            } else {

                if(keyword==='bluz'){
                    debugger
                  }
    
                // if (exactmatch) {
                return title.toLowerCase().indexOf(keyword.toLowerCase()) !==-1 //.replace(/\s/g, ',').split(',').filter(f => f === keyword).length > 0
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
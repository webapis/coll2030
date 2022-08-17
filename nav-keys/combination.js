function getCombinations(navMatch) {
    const chars = navMatch.map((m) => m.index)
    var result = [];
    var resultObj = []
    var f = function (prefix, chars) {
        for (var i = 0; i < chars.length; i++) {
           const next= navMatch[i]
          
            if (resultObj.findIndex(f =>{ 
              
                const  isNegative =  f.groupid === next.groupid
     
                return true} 
               ) ===-1 ) {
              
                resultObj.push(next)
                result.push(prefix + chars[i]);
                f(prefix + chars[i], chars.slice(i + 1));
            } else{
             
            }

        }
    }
    f('', chars);
    return result;
}

module.exports = { getCombinations }
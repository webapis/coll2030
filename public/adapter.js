if (!Object.entries)
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
  };

  if (!Object.values)
  {
    Object.values =function (o)
    {
        
     return Object.keys(o).map(function(k) {return o[k]})
    }

  }
  
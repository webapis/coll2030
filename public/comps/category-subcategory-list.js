
        
        var selectedSubcategory =localStorage.getItem('selected-subcategory')

        if(selectedSubcategory===null){
            document.getElementById('content').insertAdjacentHTML('beforeend',  '<div class="container"><div id="urun-alt-urun-list" class="row"></div></div>')
            fetch('./category-nav.json').then(function (response) {
                return response.json()
            }).then(function (data) {
                
            
                var selectedSubcategory =localStorage.getItem('selected-subcategory')
                
                var categories = Object.entries(data[0].nav.categories)//.find(function(m){return m[0]===selectedSubcategory})[1]
                
                var categoriesArray =Object.values(categories)
                
                var subcategories =categoriesArray.reduce(function(prev,curr,i){
                    var subs =Object.entries( curr[1]['subcategories'])
                   
                    var mappedsubs =subs.map(function(m){    
                        return{subcategory:m[0],total:m[1]['count']} })
              
                        return [...prev,...mappedsubs]
                },[])
             
                subcategories.forEach(function (m, i) {
                    
                    var subcategory = m.subcategory
                    var total =m.total
              
                    var div = document.createElement('ul')
                
                    div.href='#'
                    div.className='col-12 col-sm-6 col-md-4 col-lg-3 mb-1'
                    div.insertAdjacentHTML('afterbegin', '<li id="'+subcategory+'" class="list-group-item-action list-group-item d-flex justify-content-between align-items-center">'+
                      '<div>'+subcategory+'</div>'+
                      '<span class="badge bg-secondary rounded-pill">'+total+'</span></li>'
                  )
                
                    document.getElementById('urun-alt-urun-list').appendChild(div)
                  document.getElementById(subcategory).addEventListener('click',function(e){
                        var subcategory =e.currentTarget.id
                        localStorage.setItem('selected-subcategory',subcategory)
                        localStorage.setItem('total-selected-subcategory',total)
                        window.location.replace(window.location.href+"?subcategory="+subcategory)
                })
            })
        })
        }

    
    






  
        var selectedMarka =localStorage.getItem('selected-marka')
        if(!window.fetch){
            alert('fetch is not supported')
        }
        if(selectedMarka===null){
            document.getElementById('subcategory-content').insertAdjacentHTML('beforeend','<div class="container"><div id="marka-list" class="row"></div></div>')
            fetch('./marka-nav.json').then(function (response) {
                return response.json()
            }).then(function (data) {
    
    
                var markas = Object.entries(data[0].nav.markas)
                
                markas.forEach(function (m, i) {
                    var marka = m[0]
                    if(marka==='faststep'){
                        
                    }
                    var totalByCatory = m[1]['totalByCatory']
                    
                    var div = document.createElement('ul')
                    div.href='#'
                    div.className='col-12 col-sm-6 col-md-4 col-lg-3 mb-1'
                    div.insertAdjacentHTML('afterbegin', '<li id="'+marka+'" name="'+marka+'" class="list-group-item-action list-group-item d-flex justify-content-between align-items-center">'+
                      '<div class="text-capitalize fs-6 fw-light">'+marka+'</div>'+
                      '<span class="badge bg-secondary rounded-pill">'+totalByCatory+'</span>'+
                    '</li>'  
                  )
            
                    document.getElementById('marka-list').appendChild(div)
    
                    document.getElementById(marka).addEventListener('click',function(e){
                            var marka =e.currentTarget.id
                            localStorage.setItem('selected-marka',marka)
                            window.location.replace(window.location.href+"?marka="+marka)
                         
                    })
               
                })
    
            })
        }
   




/*



  
        var selectedMarka =localStorage.getItem('selected-marka')
        if(!window.fetch){
            alert('fetch is not supported')
        }
        if(selectedMarka===null){
            document.getElementById('content').insertAdjacentHTML('beforeend','<div class="container"><div id="marka-list" class="row"></div></div>')
            fetch('./marka-nav.json').then(function (response) {
                return response.json()
            }).then(function (data) {
    
    
                var markas = Object.entries(data[0].nav.markas)
                
                markas.forEach(function (m, i) {
                    var marka = m[0]
                    if(marka==='faststep'){
                        
                    }
                    var totalByCatory = m[1]['totalByCatory']
                    
                    var div = document.createElement('ul')
                    div.href='#'
                    div.className='col-12 col-sm-6 col-md-4 col-lg-3 mb-1'
                    div.insertAdjacentHTML('afterbegin', '<li id="'+marka+'" name="'+marka+'" class="list-group-item-action list-group-item d-flex justify-content-between align-items-center">'+
                      '<img src="'+placeholders[marka].logo.image+'" height="'+placeholders[marka].logo.height+'" width="'+placeholders[marka].logo.width+'"/>'+
                      '<span class="badge bg-secondary rounded-pill">'+totalByCatory+'</span>'+
                    '</li>'  
                  )
            
                    document.getElementById('marka-list').appendChild(div)
    
                    document.getElementById(marka).addEventListener('click',function(e){
                            var marka =e.currentTarget.id
                            localStorage.setItem('selected-marka',marka)
                            window.location.replace(window.location.href+"?marka="+marka)
                         
                    })
               
                })
    
            })
        }
   


*/


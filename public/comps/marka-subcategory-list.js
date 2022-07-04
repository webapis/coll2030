customElements.define('marka-subcategory-list',class extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        var selectedSubcategory =localStorage.getItem('selected-subcategory')
        if(selectedSubcategory===null){
            this.innerHTML = '<div class="container"><div id="subcategory-list" class="row"></div></div>'
            fetch('./marka-nav.json').then(function (response) {
                return response.json()
            }).then(function (data) {
    
            
                var selectedMarka =localStorage.getItem('selected-marka')
                var categories = Object.entries(data[0].nav.markas).find(function(m){return m[0]===selectedMarka})[1]
                var categoriesArray =Object.entries(categories.categories)
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
                    div.insertAdjacentHTML('afterbegin', `
                    <li id="${subcategory}" class="list-group-item-action list-group-item d-flex justify-content-between align-items-center">
                     
                      <div>${subcategory}</div>
                      <span class="badge bg-secondary rounded-pill">${total}</span>
                    </li>
                    
                  `)
                
                    document.getElementById('subcategory-list').appendChild(div)
                    document.getElementById(`${subcategory}`).addEventListener('click',function(e){
                        var subcategory =e.currentTarget.id
                        localStorage.setItem('selected-subcategory',subcategory)
                        window.location.replace(window.location.href+`?subcategory=${subcategory}`)
                     
                })
    
     
    
            })
        })

        }
     
    
    }
})




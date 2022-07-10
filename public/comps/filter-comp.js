
let selectedSubcateogry = localStorage.getItem('selected-subcategory')
let selectMarka = localStorage.getItem('selected-marka')

if (selectedSubcateogry) {
  document.getElementById('navbar').insertAdjacentHTML('beforeend', `<div class="container">
  <p>

  <button class="btn btn-sm btn-outline-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg>
  </button>
</p>
<div class="collapse" id="collapseFilter">
  <div class="card card-body">
  <div class="row d-flex flex-column flex-wrap" style='height:100vh;overflow:auto;'  id="filter-container"></div>

  </div>
</div>
</div>
  `)
let keywordpath =''
if(selectMarka){

  keywordpath='/keywords/marka/' + selectMarka + '.json'
} else{
  keywordpath='/keywords/category/' + selectedSubcateogry + '.json'

}

    fetch(keywordpath).then(function (response) { return response.json() }).then(function (data) {
      
      const subcategories = Object.entries(data)
      subcategories.sort(function (a, b) {
   
        var textA = a[0].toUpperCase();
        var textB = b[0].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }).forEach(function (subcategory, i) {
        const parentKeyword = subcategory[0]
        const totalParent = subcategory[1][parentKeyword]
        const keywords = Object.entries(subcategory[1])
        
        const matchWithPrevious =i >0 && subcategories[i-1][0].charAt(0)===subcategory[0].charAt(0)
        debugger
        if(i===0 || !matchWithPrevious){
          document.getElementById('filter-container').insertAdjacentHTML('beforeend', `
          <div class="col-12 col-sm-6 col-md-3 col-lg-3"> <p>
     <span class="badge rounded-pill text-bold bg-secondary" data-bs-toggle="collapse" data-bs-toggle="collapse" href="#collapseExample-${i}" role="button" aria-expanded="false" aria-controls="collapseExample-${i}">
     ${parentKeyword.charAt(0).toLocaleUpperCase()}
     </span>
   </p>
 
   </div>     
           `)    
        }
        document.getElementById('filter-container').insertAdjacentHTML('beforeend', `
       <div class="col-12 col-sm-6 col-md-3 col-lg-3"> <p>
  <span class="badge rounded-pill text-secondary badge rounded-pill text-bg-info text-capitalize" data-bs-toggle="collapse" data-bs-toggle="collapse" href="#collapseExample-${i}" role="button" aria-expanded="false" aria-controls="collapseExample-${i}">
  ${parentKeyword}
  </span>
</p>
<div class="collapse" id="collapseExample-${i}">
  <div class="list-group border order-success p-2 border-1 rounded-1" id ="card-body-${i}">
 
  </div>
  </div>   
</div>     
        `)
        keywords.forEach(function(kword){
          const title =kword[0]
          const total =kword[1]
            document.getElementById(`card-body-${i}`).insertAdjacentHTML('beforeend',`
            
            <li class="list-group-item-action d-flex justify-content-between align-items-start">
            <a href="#" class="nav-link" id="${title}">
             
             ${title}
            </a>
            <span class="badge bg-secondary rounded-pill">${total}</span>
          </li>
            
            `)

            document.getElementById(title).addEventListener('click',function(e){
              var id =e.target.id
              localStorage.setItem('selected-keyword',id)
              localStorage.setItem('selected-keyword-total',total)
              window.location.reload()
        
            })
          
        })

      })

    })


  
}





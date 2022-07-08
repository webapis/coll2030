
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
  <div class="row "  id="filter-container"></div>

  </div>
</div>
</div>
  `)

  if (selectMarka) {
    fetch('/keywords/marka/' + selectMarka + '.json').then(function (response) { return response.json() }).then(function (data) {
      const subcategories = Object.entries(data[selectedSubcateogry])
      subcategories.forEach(function (subcategory, i) {
        const parentKeyword = subcategory[0]
        const totalParent = subcategory[1][parentKeyword]
        const keywords = Object.entries(subcategory[1])
        document.getElementById('filter-container').insertAdjacentHTML('beforeend', `
       <div class="col-3"> <p>
  <a class="nav-link" data-bs-toggle="collapse" href="#collapseExample-${i}" role="button" aria-expanded="false" aria-controls="collapseExample-${i}">
  ${parentKeyword}
  </a>

</p>
<div class="collapse" id="collapseExample-${i}">
  <div class="list-group" id ="card-body-${i}" style="height:200px; overflow: auto;">
 
  </div>
  </div>   
</div>     
        `)


        keywords.forEach(function(kword){
          const title =kword[0]
          const total =kword[1]
            document.getElementById(`card-body-${i}`).insertAdjacentHTML('beforeend',`
            
            <li class="list-group-item-action d-flex justify-content-between align-items-start">
            <a href="#" class="nav-link">
             
             ${title}
            </a>
            <span class="badge bg-secondary rounded-pill">${total}</span>
          </li>
            
            `)
          
        })

      })

    })
  } else{
    fetch('/keywords/category/' + selectedSubcateogry + '.json').then(function (response) { return response.json() }).then(function (data) {
      
      const subcategories = Object.entries(data)
      subcategories.forEach(function (subcategory, i) {
        const parentKeyword = subcategory[0]
        const totalParent = subcategory[1][parentKeyword]
        const keywords = Object.entries(subcategory[1])
        document.getElementById('filter-container').insertAdjacentHTML('beforeend', `
       <div class="col-12 col-sm-6 col-md-4 col-lg-3"> <p>
  <a class="nav-link" data-bs-toggle="collapse" href="#collapseExample-${i}" role="button" aria-expanded="false" aria-controls="collapseExample-${i}">
  ${parentKeyword}
  </a>

</p>
<div class="collapse" id="collapseExample-${i}">
  <div class="list-group border order-success p-2 border-1 rounded-1" id ="card-body-${i}" style="height:200px; overflow: auto;">
 
  </div>
  </div>   
</div>     
        `)


        keywords.forEach(function(kword){
          const title =kword[0]
          const total =kword[1]
            document.getElementById(`card-body-${i}`).insertAdjacentHTML('beforeend',`
            
            <li class="list-group-item-action d-flex justify-content-between align-items-start">
            <a href="#" class="nav-link">
             
             ${title}
            </a>
            <span class="badge bg-secondary rounded-pill">${total}</span>
          </li>
            
            `)
          
        })

      })

    })


  }
}




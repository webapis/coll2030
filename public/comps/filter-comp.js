
document.getElementById('navbar').insertAdjacentHTML('beforeend','<div class="container p-1"><div class="accordion" id="accordionExample">'+
'<div class="accordion-item">'+
  '<h2 class="accordion-header p-0" id="headingOne">'+
    '<button class="accordion-button p-1 px-3"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">'+
  '<path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>'+
'</svg>'+
    '<span class="mx-2">Seçenekler</span></button>'+
  '</h2>'+
  '<div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">'+
    '<div class="accordion-body">'+
     'filter content here'+
    '</div>'+
  '</div>'+
'</div>'+
'</div></div>')


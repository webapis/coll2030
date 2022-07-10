
if(!fetch){
    alert('fetch is not supported')
}
//BREAD CRUMB
        var selectedHomeTab = localStorage.getItem('home-tab')
        var selectedMarka =localStorage.getItem('selected-marka')
        var selectedSubcategory =localStorage.getItem('selected-subcategory')
        var selectedKeyword=localStorage.getItem('selected-keyword')

        document.getElementById('navbar').insertAdjacentHTML('beforeend','<div class="container" id="bread-crumb-container">'+
        '<a class="navbar-brand" href="/index.html">'+
         'MODABURADA'+
        '</a>'+
        '<nav aria-label="breadcrumb">'+
        '<ol class="breadcrumb">'+
        '<li class="breadcrumb-item"><a href="#" id="home-crumb">Anasayfa</a></li>'+
        (selectedHomeTab==='marka-tab'? '<li class="breadcrumb-item"><a href="#" id="markalar-crumb">Marka</a></li>':'')  +
        (selectedHomeTab==='urun-tab'?'<li class="breadcrumb-item"><a href="#" id="urun-crumb">Ürün</a></li>':'')+
        (selectedMarka ?'<li class="breadcrumb-item active"><a href="#" id="marka-crumb">'+selectedMarka+'</a></li>':'')+
        (selectedSubcategory ?'<li class="breadcrumb-item text-black-50"><a href="#" id="subcategory-crumb">'+selectedSubcategory+'</a></li>':'') +
        (selectedKeyword ?'<li class="breadcrumb-item text-black-50 active">'+selectedKeyword+'</li>':'') +
 
        '</ol>'+
      '</nav>'+
      '</div>')

  var breadcrumbs= document.getElementById('navbar').querySelectorAll('.breadcrumb-item')
  for(var i=0; i<breadcrumbs.length; i++){
  var element = breadcrumbs[i]
  element.addEventListener('click', function (e) {
    e.preventDefault()
    var id = e.target.id
    switch (id) {
        case 'home-crumb':
            localStorage.setItem('home-tab','marka-tab')
            localStorage.setItem('page','/index.html')
            localStorage.removeItem('selected-marka')
            localStorage.removeItem('selected-subcategory')
            localStorage.removeItem('selected-keyword')
            localStorage.removeItem('selected-keyword-total')
            localStorage.removeItem('total-selected-subcategory')
            break;
        case 'marka-crumb':
            localStorage.setItem('home-tab','marka-tab')
            localStorage.setItem('page','/index.html')
         //   localStorage.removeItem('selected-marka')
          localStorage.removeItem('selected-subcategory')
          localStorage.removeItem('selected-keyword')
          localStorage.removeItem('selected-keyword-total')
          localStorage.removeItem('total-selected-subcategory')
            break;
            case 'markalar-crumb':
                localStorage.setItem('home-tab','marka-tab')
                localStorage.setItem('page','/index.html')
                localStorage.removeItem('selected-marka')
                localStorage.removeItem('selected-subcategory')
                localStorage.removeItem('selected-keyword')
                localStorage.removeItem('selected-keyword-total')
                localStorage.removeItem('total-selected-subcategory')
                break;
        case 'urun-crumb':
            localStorage.setItem('home-tab','urun-tab')
            localStorage.setItem('page','/urunler.html')
            localStorage.removeItem('selected-marka')
            localStorage.removeItem('selected-subcategory')
            localStorage.removeItem('selected-keyword')
            localStorage.removeItem('selected-keyword-total')
            localStorage.removeItem('total-selected-subcategory')
            break;

            case 'subcategory-crumb':
                localStorage.setItem('home-tab','urun-tab')
                localStorage.removeItem('selected-keyword')
                localStorage.removeItem('selected-keyword-total')
                break;
        default:
    }
    window.location.replace(localStorage.getItem('page'))
})

  }
       
    






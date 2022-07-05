customElements.define('main-tabs', class extends HTMLElement {
    constructor(){
        super()
    }
    connectedCallback(){
      var selectedHomeTab =localStorage.getItem('home-tab')

        this.innerHTML='<div class="container"><ul class="nav nav-tabs justify-content-center m-2">'+
        '<li class="nav-item">'+
         '<a class="nav-link" aria-current="page" href="/markalar.html" id="marka-tab">Markalar</a>'+
        '</li>'+
        '<li class="nav-item">'+
          '<a class="nav-link" href="/urunler.html"  id="urun-tab">Ürünler</a>'+
        '</li>'+
      '</ul></div>'
      this.querySelectorAll('.nav-link').forEach(function(element){
        var id =element.id
        if(selectedHomeTab===id){
          element.classList.add('active')
        }
      })

      this.querySelectorAll('.nav-link').forEach(function(element){
      element.addEventListener('click',function(e){
        
        localStorage.setItem('home-tab',e.target.id)
        localStorage.removeItem('selected-marka')
        localStorage.removeItem('selected-subcategory')
        window.location.replace(e.target.href)
      })

      })
    }
})
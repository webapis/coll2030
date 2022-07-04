customElements.define('bread-crumb', class extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {

        var selectedHomeTab = localStorage.getItem('home-tab')
        var selectedMarka =localStorage.getItem('selected-marka')
        var selectedUrun =localStorage.getItem('selected-urun')
        this.innerHTML = `<div class="container"><nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#" id="home-crumb">Home</a></li>
          ${selectedHomeTab==='marka-tab' ? ' <li class="breadcrumb-item"><a href="#" id="marka-crumb">Markalar</a></li>':''}
          ${selectedHomeTab==='urun-tab' ? '   <li class="breadcrumb-item"><a href="#" id="urun-crumb">Ürünler</a></li>':''}
          ${selectedMarka  ?  '<li class="breadcrumb-item"><a href="#" id="marka-crumb">'+selectedMarka+'</a></li>' :''}
          ${selectedUrun  ?  '<li class="breadcrumb-item"><a href="#" id="urun-crumb">'+selectedUrun+'</a></li>' :''}
          <li class="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
      </nav></div>`

        this.querySelectorAll('a').forEach(function (element) {
            element.addEventListener('click', function (e) {
                e.preventDefault()
                var id = e.target.id
                switch (id) {
                    case 'home-crumb':
                        localStorage.setItem('home-tab','marka-tab')
                        localStorage.setItem('page','/index.html')
                        localStorage.removeItem('selected-marka')
                        localStorage.removeItem('selected-subcategory')
                        break;
                    case 'marka-crumb':
                        localStorage.setItem('home-tab','marka-tab')
                        localStorage.setItem('page','/index.html')
                        localStorage.removeItem('selected-marka')
                        localStorage.removeItem('selected-subcategory')
                        break;
                    case 'urun-crumb':
                        localStorage.setItem('home-tab','urun-tab')
                        localStorage.setItem('page','/index.html')
                        localStorage.removeItem('selected-marka')
                        localStorage.removeItem('selected-subcategory')
                        break;
                    default:
                }
                window.location.replace(localStorage.getItem('page'))
            })
        })
    }


})